import datetime
import json
from flask import Flask, render_template, request, jsonify, make_response, redirect
from form import ContactForm
import os
from flask_babel import Babel
from flask_mail import Mail, Message
from dotenv import load_dotenv
import gspread
from google.oauth2.service_account import Credentials
from flask_cors import CORS  # Import CORS to handle cross-origin requests

load_dotenv()
app = Flask(__name__)

PROJECT_NAME="LazerCO2"

# Configure CORS to allow requests from your React app
CORS(app, resources={r"/*": {
    "origins": "http://localhost:5173",  # Your React development server
    "supports_credentials": True
}})

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or os.urandom(24)
app.config['BABEL_DEFAULT_LOCALE'] = 'pt'
app.config['BABEL_SUPPORTED_LOCALES'] = ['en', 'pt']
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['TO_EMAIL'] = os.environ.get('TO_EMAIL')
app.config['MAIL_DEFAULT_SENDER'] = app.config['MAIL_USERNAME']  # Add a default sender
babel = Babel(app)
mail_instance = Mail(app)

def get_locale():
    return request.cookies.get('lang') or request.accept_languages.best_match(app.config['BABEL_SUPPORTED_LOCALES'])

@app.route('/lang/<lang_code>')
def set_language(lang_code):
    response = make_response(redirect('/'))
    response.set_cookie('lang', lang_code)
    return response


babel.init_app(app, locale_selector=lambda: request.cookies.get('lang') or request.accept_languages.best_match(app.config['BABEL_SUPPORTED_LOCALES']))


SHEET_HEADERS = [
    'Name',
    'Email',
    'Phone',
    'Subject',
    'Contact Date'
]

# Debug function to log form data
def log_form_data(data, title="Form Data"):
    print(f"\n--- {title} ---")
    for key, value in data.items():
        print(f"{key}: {value}")
    print("----------------\n")

# Function to generate a professional HTML email
def generate_email_html(form_data):
    """
    Generate a professional-looking HTML email for form submissions
    
    Parameters:
    - form_data: The ContactForm instance
    - services_str: Comma-separated string of selected services
    
    Returns:
    - HTML string for the email content
    """
    
    html = f"""
    <!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova Mensagem de Contacto - Webtech87</title>
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: white;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }}
            .header {{
                text-align: center;
                padding: 20px 0;
                border-bottom: 2px solid #f0f0f0;
            }}
            .header img {{
                max-width: 150px;
                height: auto;
            }}
            .content {{
                padding: 20px 0;
            }}
            h1 {{
                color: #2b3990;
                font-size: 24px;
                margin-top: 0;
                margin-bottom: 20px;
            }}
            .info-group {{
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #f0f0f0;
            }}
            .info-group:last-child {{
                border-bottom: none;
            }}
            .label {{
                font-weight: 600;
                color: #2b3990;
                margin-bottom: 5px;
                display: block;
            }}
            .value {{
                margin: 0;
            }}
            .message-box {{
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
                border-left: 4px solid #2b3990;
                margin-top: 5px;
            }}
            .footer {{
                text-align: center;
                padding-top: 20px;
                border-top: 2px solid #f0f0f0;
                color: #777777;
                font-size: 12px;
            }}
            .services {{
                display: flex;
                flex-wrap: wrap;
                margin-top: 5px;
            }}
            .service-tag {{
                background-color: #e3e6f7;
                color: #2b3990;
                padding: 5px 10px;
                border-radius: 3px;
                margin-right: 5px;
                margin-bottom: 5px;
                font-size: 12px;
            }}
            .highlight {{
                color: #2b3990;
                font-weight: 500;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <!-- Replace with your logo URL -->
                <img src="https://webtech87.pt/logo.png" alt="Webtech87 Logo">
                <h1>Nova Mensagem de Contacto</h1>
            </div>
            
            <div class="content">
                <div class="info-group">
                    <span class="label">Informações de Contacto</span>
                    <p class="value"><strong>Nome:</strong> {form_data.name.data}</p>
                    <p class="value"><strong>Email:</strong> <a href="mailto:{form_data.email.data}">{form_data.email.data}</a></p>
                    <p class="value"><strong>Telefone:</strong> {form_data.phone.data or "Não fornecido"}</p>
                </div>
                
                <div class="info-group">
                    <span class="label">Mensagem</span>
                    <div class="message-box">
                        {form_data.msg.data}
                    </div>
                </div>
                                
                <div class="info-group">
                    <span class="label">Informações Adicionais</span>
                    <p class="value"><strong>Data de Envio:</strong> {datetime.datetime.now().strftime('%d/%m/%Y %H:%M')}</p>
                </div>
            </div>
            
            <div class="footer">
                <p>&copy; 2025 Webtech87. Todos os direitos reservados.</p>
                <p>Este email foi gerado automaticamente em resposta a uma submissão do formulário de contacto em webtech87.pt</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return html

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        # Return the rendered template for GET requests
        form = ContactForm()
        context = {
            'title': 'Santibrow',
            'form': form
        }
        return render_template('index.html', **context)
    
    elif request.method == 'POST':
        try:
            # Log raw request data for debugging
            print("\n=== RAW REQUEST DATA ===")
            print(f"Content-Type: {request.content_type}")
            print(f"Form Data: {request.form}")
            if request.is_json:
                print(f"JSON Data: {request.json}")
            print("========================\n")
            
            # For form data from React
            if request.is_json:
                form_data = request.get_json()
            else:
                form_data = request.form  # fallback
            log_form_data(form_data, "Received Form Data")
            
            # Handle services field which might be a list
            services = request.form.getlist('services')
            
            # Create a form instance and populate it with data from the request
            form = ContactForm(form_data)

            
            # Log form data after processing
            print(f"Form validation: {form.validate()}")
            if not form.validate():
                print(f"Form errors: {form.errors}")
            
            if form.validate():

                new_data = [
                    form.name.data,
                    form.email.data,
                    form.phone.data,
                    form.subject.data,
                    datetime.datetime.now().strftime('%d/%m/%Y %H:%M')
                ]
                
                print("New data row for sheets:", new_data)
                
                try:
                    mail = Message(
                        subject=f'{PROJECT_NAME} Nova mensagem de contacto: {form.name.data}',
                        recipients=[app.config['TO_EMAIL']],
                        sender=app.config['MAIL_USERNAME'] or app.config['MAIL_DEFAULT_SENDER'],
                        html=generate_email_html(form)
                    )
                    print("Attempting to send email...")
                    mail_instance.send(mail)
                    print("Email sent successfully")
                except Exception as mail_error:
                    print(f"Mail error: {mail_error}")
                    # Continue even if email fails
                
                # Save to Google Sheets
                try:
                    print("Setting up Google Sheets connection...")
                    SCOPES = [
                        'https://www.googleapis.com/auth/spreadsheets',
                        'https://www.googleapis.com/auth/drive',
                    ]
                    GOOGLE_SHEET_ID = os.environ.get('GOOGLE_SHEET_ID')
                    CREDENTIALS_FILE = os.environ.get('GOOGLE_SHEETS_CREDS_PATH')
                    
                    print(f"Google Sheet ID: {GOOGLE_SHEET_ID}")
                    print(f"Credentials file path: {CREDENTIALS_FILE}")
                    
                    credentials = Credentials.from_service_account_file(
                        CREDENTIALS_FILE,
                        scopes=SCOPES
                    )

                    client = gspread.authorize(credentials)
                    google_sheet_file = client.open_by_key(GOOGLE_SHEET_ID)
                    today_wb = datetime.datetime.date(datetime.datetime.now()).strftime('%Y-%m')
                    sheets_list = [sheet.title for sheet in google_sheet_file.worksheets()]
                    
                    print(f"Available sheets: {sheets_list}")
                    print(f"Looking for sheet: {today_wb}")
                    
                    if today_wb not in sheets_list:
                        print(f"Creating new sheet: {today_wb}")
                        google_sheet_file.add_worksheet(
                            title=today_wb,
                            rows="1000",
                            cols=len(SHEET_HEADERS)
                        )
                        wb = google_sheet_file.worksheet(today_wb)
                        wb.insert_row(SHEET_HEADERS, 1)
                    
                    wb = google_sheet_file.worksheet(today_wb)
                    wb.append_row(new_data)
                    print("Data added to Google Sheet")
                except Exception as sheet_error:
                    print(f"Google Sheets error: {sheet_error}")
                    # Continue even if sheets fails
                
                # For React frontend, return JSON response
                return jsonify({'success': True, 'message': 'Formulário enviado com sucesso! Entraremos em contato em breve.'})
            else:
                # Handle form validation errors
                errors = {field: errors for field, errors in form.errors.items()}
                print(f"Form validation failed: {errors}")
                return jsonify({'success': False, 'errors': errors}), 400
                
        except Exception as e:
            print(f"!!! Error in route handler: {str(e)}")
            # Return error response for React
            return jsonify({'success': False, 'message': f'Ocorreu um erro: {str(e)}'}), 500

    # For any other method
    return jsonify({'success': False, 'message': 'Método não permitido'}), 405

# Add a route to test email configuration with HTML template
@app.route('/test-email', methods=['GET'])
def test_email():
    try:
        # Create a sample form data object for testing
        form = ContactForm()
        form.name.data = "Cliente Teste"
        form.email.data = "teste@exemplo.com"
        form.phone.data = "+351 910 000 000"
        form.company_name.data = "Empresa Teste"
        form.msg.data = "Este é um email de teste. Está recebendo este email para verificar o template HTML."
        form.desc_meets.data = "Google"
        form.budget.data = "3000€ - 5000€"
        form.dead_line.data = datetime.datetime.now().strftime('%Y-%m-%d')
        
        services_str = "Desenvolvimento Web, E-commerce, SEO"
        
        msg = Message(
            subject=f'[TESTE] Nova mensagem de contacto: {form.name.data}',
            recipients=[app.config['TO_EMAIL']],
            sender=app.config['MAIL_USERNAME'] or app.config['MAIL_DEFAULT_SENDER'],
            html=generate_email_html(form, services_str)
        )
        mail_instance.send(msg)
        return "Email de teste enviado com sucesso! Verifique sua caixa de entrada. O email agora utiliza um template HTML profissional."
    except Exception as e:
        return f"Erro ao enviar e-mail: {str(e)}"

if __name__ == '__main__':
    # Verify email configuration on startup
    print("\n=== EMAIL CONFIGURATION ===")
    print(f"MAIL_SERVER: {app.config['MAIL_SERVER']}")
    print(f"MAIL_PORT: {app.config['MAIL_PORT']}")
    print(f"MAIL_USERNAME: {app.config['MAIL_USERNAME']}")
    print(f"MAIL_PASSWORD: {'CONFIGURED' if app.config['MAIL_PASSWORD'] else 'MISSING'}")
    print(f"TO_EMAIL: {app.config['TO_EMAIL']}")
    print("=========================\n")
    
    app.run(debug=True)