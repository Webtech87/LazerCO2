from wtforms.validators import Regexp
from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, SubmitField, SelectField, BooleanField
from wtforms.validators import DataRequired, Length
from flask_babel import lazy_gettext as _
from wtforms.widgets import TextArea, RadioInput, Select


class ContactForm(FlaskForm):
    class Meta:
        csrf = False

    name = StringField(_('Nome'), validators=[DataRequired(), Length(min=4, max=20)])

    email = EmailField(
        _('Email Address'),
        validators=[
            DataRequired(),
            Length(
                min=6,
                max=35
            )
        ]
    )
    phone = StringField(
        _('Telefone'),
        validators=[
            DataRequired(),
            Regexp(r'^\d+$', message="Enter a valid phone number."),
            Length(
                min=9,
                max=15
            )
        ]
    )

    subject = SelectField(
        _('Assunto'),
        choices=[
            ('select', _('Selecione')),
            ('rosto_pescoço_colo', _('Rosto, Pescoço e Colo')),
            ('blefaroplastia_superior', _('Blefaroplastia superior e inferior sem corte')),
            ('remoção_sinais', _('Remoção de sinais, cicatrizes e manchas')),
            ('rejuvenescimento', _('Rejuvenescimento global')),
            ('consultation', _('Marcar uma Consulta')),
        ],
        option_widget=RadioInput(),
        widget=Select()
    )


    msg = StringField(
        _('Mensagem'),
        validators=[DataRequired(),
                    Length(
                        min=1,
                        max=1000
                    )
                    ],
        widget=TextArea(),
        render_kw={"cols": 100, "rows": 5}
    )
    accept_terms = BooleanField("Accept Terms")
    submit = SubmitField(
        _('Enviar')
    )

