# Main_Blockly_WP
Как синхронизировать поддерево
В репозитории вложен репозиторий поддерево - fork блокли
https://docs.github.com/ru/get-started/using-git/about-git-subtree-merges#adding-a-new-repository-as-a-subtree

git remote add -f blockly_fork https://github.com/V-Proskurin/blockly-1

git merge -s ours --no-commit --allow-unrelated-histories blockly_fork/develop

git read-tree --prefix=blockly_fork/ -u blockly_fork/develop

Теперь подключен подрепозиторий https://github.com/V-Proskurin/blockly-1, который можно от этого форк обновлять. И сам fork обновлять уже от блокли.

Также есть отдельный репозиторий WP_blockly и он тоже сюда входит. Но как подпапка. Когда его синхронизируешь, он только подпапку синхронизирует.

Зафиксируйте изменения, чтобы обеспечить их безопасность.

git commit -m "Subtree merged in blockly_fork"
> [main fe0ca25] Subtree merged in blockly_fork

Для обновления от подрепозитория https://github.com/V-Proskurin/blockly-1 надо сделать команду:
git pull -s subtree blockly_fork develop


ЕЩЕ вариант:
https://gist.github.com/mewforest/6ee59caa4a4032d95714244c2cd1733d
Добавление других проектов, как подмодулей
Допустим, в своем проекте вы используете другой свой (или чужой, почему нет) репозиторий, вот вы его склонировали, но что дальше? Конечно, можно просто удалить папку .git у только что склонированного подпроекта и дело с концом, но тогда не будет синхронизации с оригинальным репозиторием и все изменения придется применять руками. Это не очень удобно, лучше пометьте эту папку как подмодуль:

git submodule add git@github.com/.../blablabla.git blablabla
Отлично! Теперь пушьте и забудьте о варварстве с удалением .git.
