# Tạo file .bat

B1: Mở notepad
B2: Copy nội dung dưới đây vào

@echo off
json-server --watch db.json --port 4000

B3: Lưu ở định dạng file .bat, vd: start_json_server.bat

# mockAPI

name: concat('user*', id)
email: concat('user*', id, '@gmail.com')
status: if this == true then 'active' else 'inactive' end
views: random(1, 1000)
createdAt: SQL_datetime
updatedAt: SQL_datetime
