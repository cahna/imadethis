"""Add created_at timestamps to models

Revision ID: 5ae59554dd06
Revises: 462fc79586ad
Create Date: 2020-03-15 17:08:16.895049

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5ae59554dd06'
down_revision = '462fc79586ad'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('thread', sa.Column('date_created', sa.DateTime(), nullable=True))
    op.create_index(op.f('ix_thread_date_created'), 'thread', ['date_created'], unique=False)
    op.add_column('thread_membership', sa.Column('date_created', sa.DateTime(), nullable=True))
    op.create_index(op.f('ix_thread_membership_date_created'), 'thread_membership', ['date_created'], unique=False)
    op.add_column('user', sa.Column('date_created', sa.DateTime(), nullable=True))
    op.create_index(op.f('ix_user_date_created'), 'user', ['date_created'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_user_date_created'), table_name='user')
    op.drop_column('user', 'date_created')
    op.drop_index(op.f('ix_thread_membership_date_created'), table_name='thread_membership')
    op.drop_column('thread_membership', 'date_created')
    op.drop_index(op.f('ix_thread_date_created'), table_name='thread')
    op.drop_column('thread', 'date_created')
    # ### end Alembic commands ###
