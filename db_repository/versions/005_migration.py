from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
t_dokumen = Table('t_dokumen', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('id_buku', String(length=32)),
    Column('kategori', Integer),
    Column('sub_kategori', Integer),
    Column('judul', String(length=128)),
    Column('penulis', String(length=128)),
    Column('tahun', Integer),
    Column('isbn', String(length=64)),
    Column('isbn_13', String(length=64)),
    Column('abstrak', Text),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['t_dokumen'].columns['id_buku'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['t_dokumen'].columns['id_buku'].drop()
