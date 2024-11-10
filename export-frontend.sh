#!/bin/bash

# Удаляем старый файл, если он существует
rm -f frontend_structure.txt

# Экспортируем структуру
find . -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.css" \) \
  -not -path "./node_modules/*" \
  -not -path "./build/*" \
  -not -path "./coverage/*" \
  | while read -r file; do
    echo "=== $file ===" >> frontend_structure.txt
    echo >> frontend_structure.txt
    cat "$file" >> frontend_structure.txt
    echo >> frontend_structure.txt
    echo "=================================================" >> frontend_structure.txt
    echo >> frontend_structure.txt
done

echo "Структура фронтенда экспортирована в frontend_structure.txt"
