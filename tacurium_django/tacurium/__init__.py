import pymysql
pymysql.install_as_MySQLdb()

# Bypass MariaDB/MySQL database version check in Django
from django.db.backends.base.base import BaseDatabaseWrapper
BaseDatabaseWrapper.check_database_version_supported = lambda self: None

# Disable the RETURNING clause features for compatibility with MariaDB 10.4
from django.db.backends.mysql.features import DatabaseFeatures
DatabaseFeatures.supports_returning_rows = property(lambda self: False)
DatabaseFeatures.can_return_columns_from_insert = property(lambda self: False)
DatabaseFeatures.can_return_rows_from_bulk_insert = property(lambda self: False)
