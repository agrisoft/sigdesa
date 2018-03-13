from flask_wtf import Form
from wtforms import HiddenField, StringField, BooleanField, IntegerField, RadioField, SelectField, TextAreaField, TextField
from flask_wtf.file import FileField
from wtforms.validators import DataRequired

class LoginForm(Form):
    username = StringField('Username', validators=[DataRequired()])
    password = StringField('Sandi', validators=[DataRequired()])
    remember_me = BooleanField('Ingat saya', default=False)

class VariabelForm(Form):
    n_variabel = StringField('Nama Tabel (Tulis dengan hurup kecil, tanpa spasi)', validators=[DataRequired()])
    r_variabel = StringField('Nama Model', validators=[DataRequired()])    

class DatadasarForm(Form):
    n_datadasar = StringField('Nama Data (Tulis dengan hurup kecil, tanpa spasi)', validators=[DataRequired()])
    r_datadasar = StringField('Nama Data', validators=[DataRequired()])  

# class KategoriForm(Form):
#     nama_kategori = StringField('Nama Kategori', validators=[DataRequired()])

# class SubKategoriForm(Form):
#     nama_subkategori = StringField('Nama Subkategori', validators=[DataRequired()])

# class DokumenForm(Form):
#     kategori = HiddenField('ID Kategori', validators=[DataRequired()])
#     subkategori = HiddenField('ID SubKategori', validators=[DataRequired()])
#     judul = StringField('Judul', validators=[DataRequired()])
#     penulis = StringField('Penulis', validators=[DataRequired()])
#     tahun = IntegerField('Tahun', validators=[DataRequired()])
#     isbn = IntegerField('ISBN', validators=[DataRequired()])
#     abstrak = TextAreaField('Abstrak', validators=[DataRequired()])
#     berkas = FileField('Berkas PDF', validators=[DataRequired()])