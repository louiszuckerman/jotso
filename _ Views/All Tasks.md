
```tasks

group by function \
task.created.moment?.format("YYYY-MM-DD") \
?? task.file.filename.match(/\d{4}-\d{2}-\d{2}/)?.[0] \
?? task.file.filename
```
