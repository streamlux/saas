BACKUP_FILE=/backups/weekly/mydb-202139.sql.gz
CONTAINER_NAME=pgbackups

docker exec -ti $CONTAINER_NAME sh -c "zcat ${BACKUP_FILE} | psql --username=postgres --host=db -W"
