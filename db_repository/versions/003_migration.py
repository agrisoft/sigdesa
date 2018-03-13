from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
user = Table('user', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('username', VARCHAR(length=64)),
    Column('password', VARCHAR(length=64)),
)

t_dokumen = Table('t_dokumen', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('kategori', Integer),
    Column('sub_kategori', Integer),
    Column('judul', String(length=128)),
    Column('penulis', String(length=128)),
    Column('tahun', Integer),
    Column('isbn', String(length=64)),
    Column('isbn_13', String(length=64)),
    Column('abstrak', Text),
)

t_kategori = Table('t_kategori', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('kategori', String(length=64)),
)

t_subkategori = Table('t_subkategori', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('kategori', Integer),
    Column('sub_kategori', String(length=64)),
)

t_user = Table('t_user', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('username', String(length=64)),
    Column('password', String(length=64)),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['user'].drop()
    post_meta.tables['t_dokumen'].create()
    post_meta.tables['t_kategori'].create()
    post_meta.tables['t_subkategori'].create()
    post_meta.tables['t_user'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['user'].create()
    post_meta.tables['t_dokumen'].drop()
    post_meta.tables['t_kategori'].drop()
    post_meta.tables['t_subkategori'].drop()
    post_meta.tables['t_user'].drop()
