from app import db
from marshmallow import Schema, fields

class t_user(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password = db.Column(db.String(128), index=True)
    desa = db.Column(db.String(128), index=True)
    kecamatan = db.Column(db.String(128), index=True)
    kabupaten = db.Column(db.String(128), index=True)
    provinsi = db.Column(db.String(128), index=True)
    deskripsi = db.Column(db.Text)
    kodepum = db.Column(db.String(64), index=True)

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __repr__(self):
        return '<User %r>' % (self.username)

    # @property
    def is_authenticated(self):
        return True

    # @property
    def is_active(self):
        return True

    # @property
    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)
        except NameError:
            return str(self.id)



class t_config(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    config_id = db.Column(db.String(64), index=True) 
    config_desc = db.Column(db.Text)

class t_variabel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    n_variabel = db.Column(db.String(32), index=True, unique=True)
    r_variabel = db.Column(db.String(256), index=True) 
    deskripsi = db.Column(db.Text)

class t_kategori(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    n_kategori = db.Column(db.String(32), index=True, unique=True)
    r_kategori = db.Column(db.String(256), index=True) 

class t_datadasar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    n_datadasar = db.Column(db.String(32), index=True, unique=True)
    r_datadasar = db.Column(db.String(256), index=True) 

class t_kategoribreak(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    n_variabel = db.Column(db.String(32), index=True, unique=True)
    n_break = db.Column(db.Integer)
    v_break = db.Column(db.Text)
    v_color = db.Column(db.Text)
    r_break = db.Column(db.Text)

class t_userSchema(Schema):
    id = db.Column(db.Integer, primary_key=True)
    username = fields.String()   
    password = fields.String()   
    desa = fields.String()   
    kecamatan = fields.String()   
    kabupaten = fields.String()   
    provinsi = fields.String()   
    deskripsi = fields.String()   
    kodepum = fields.String()   

class t_kategoribreakSchema(Schema):
    id = db.Column(db.Integer, primary_key=True)
    n_variabel = fields.String()   
    n_break = fields.Integer()
    v_break = fields.String()   
    v_color = fields.String()
    r_break = fields.String()

class t_configSchema(Schema):
    id = db.Column(db.Integer, primary_key=True)
    config_id = fields.String()
    config_desc = fields.String()

# class t_kategori(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     kategori = db.Column(db.String(64), index=True, unique=True)

# class t_subkategori(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     kategori = db.Column(db.Integer, db.ForeignKey('t_kategori.id'))   
#     sub_kategori = db.Column(db.String(64), index=True, unique=True)

# class t_dokumen(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     id_buku = db.Column(db.String(32))
#     kategori = db.Column(db.Integer, db.ForeignKey('t_kategori.id'))
#     sub_kategori = db.Column(db.Integer, db.ForeignKey('t_subkategori.id'))
#     judul = db.Column(db.String(128))
#     penulis = db.Column(db.String(128))
#     tahun = db.Column(db.Integer)
#     isbn = db.Column(db.String(64))
#     isbn_13 = db.Column(db.String(64))
#     abstrak = db.Column(db.Text)