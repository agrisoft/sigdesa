from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
spatial_ref_sys = Table('spatial_ref_sys', pre_meta,
    Column('srid', INTEGER, primary_key=True, nullable=False),
    Column('auth_name', VARCHAR(length=256)),
    Column('auth_srid', INTEGER),
    Column('srtext', VARCHAR(length=2048)),
    Column('proj4text', VARCHAR(length=2048)),
)

users = Table('users', pre_meta,
    Column('id', BIGINT, primary_key=True, nullable=False),
    Column('username', VARCHAR(length=128), nullable=False),
    Column('password', VARCHAR(length=256), nullable=False),
    Column('kecamatan', VARCHAR(length=128)),
    Column('kabupaten', VARCHAR(length=128)),
    Column('provinsi', VARCHAR(length=128)),
    Column('desa', VARCHAR(length=128)),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['spatial_ref_sys'].drop()
    pre_meta.tables['users'].drop()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['spatial_ref_sys'].create()
    pre_meta.tables['users'].create()
