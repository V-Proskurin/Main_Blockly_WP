# Main_Blockly_WP
Как синхронизировать поддерево
В репозитории вложен репозиторий поддерево - fork блокли
https://docs.github.com/ru/get-started/using-git/about-git-subtree-merges#adding-a-new-repository-as-a-subtree

git remote add -f blockly_fork https://github.com/V-Proskurin/blockly-1

git merge -s ours --no-commit --allow-unrelated-histories blockly_fork/develop

git read-tree --prefix=blockly_fork/ -u blockly_fork/develop

Теперь подключен подрепозиторий https://github.com/V-Proskurin/blockly-1, который можно от этого форк обновлять. И сам fork обновлять уже от блокли.

Также есть отдельный репозиторий WP_blockly и он тоже сюда входит. Но как подпапка. Когда его синхронизируешь, он только подпапку синхронизирует.

Для обновления от подрепозитория https://github.com/V-Proskurin/blockly-1 надо сделать команду:
git pull -s subtree blockly_fork develop