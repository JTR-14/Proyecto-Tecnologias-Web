import pymysql

try:
    connection = pymysql.connect(
        host='127.0.0.1',
        port=3310,
        user='root',
        password=''
    )
    cursor = connection.cursor()
    cursor.execute("DROP DATABASE IF EXISTS tacurium_django;")
    cursor.execute("CREATE DATABASE tacurium_django CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
    print("Database 'tacurium_django' reset successful.")
    connection.close()
except Exception as e:
    print(f"Error resetting database: {e}")
