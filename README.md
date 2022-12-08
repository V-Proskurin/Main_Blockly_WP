# Minecraft Blockly

Блок "зоздать дрона" - создание дрона на сервере (игрок онлайн) + первоначальная настройка мира

Блок "Координаты X Y Z" - вспомогательный блок, который передаёт координаты в нужные блоки (используется в JSON-разбор).

"Запрос даных с сервера" (и async) - данный блок запрашивает json файл с сервера и помещает ответ в переменную "response". Далее переменную response нужно поместить в блок...

"JSON-разбор" - разбирает строку JSON и помещает нужный параметр в переменную "server_data". 
Доступные параметры:
1. Для бота, игрока, дрона: x, y, z -получение определённой координаты местоположения, hp - получение количества жизней (у бота).
2. Карта блоков - получает карту блоков для для выбранного объекта (бота или дрона), параметр принимает блоком "Координаты X Y Z", подставив нужные координаты он вам выдаст что находится на этих координатах (название блока).
3. "Сущности рядом" - аналогично карты блоков, только выдаст имя сущности в тот момен времени (не забываем что сущности двигаются), также в качестве параметра принимает блок "Координаты X Y Z".
4. Блоки рядом. Упрощенная карта блоков, показывает только следующий блок у дрона (или бота), принимает параметры: in, front, behind, right, left. Возвращает название блока.
5. Только для бота - инвентарь. Принимает в качестве параметра номер слота. Возвращает предмет, который находится в данном слоте.
6. Только для игрока (если выбрать Игрок), принимает параметр chat и возвращает последнее сообщение из чата данного игрока (который он написал). Учитываются сообщения только начинающиеся с * в начале сообщения.

Бот и его автономное программирование.
У бота есть 2 типа взаимодействия: обычное (как у дрона: пока вы выполняете скрипт в блоки, он послушно его выполняет) и автономный (когда вы лишь 1 раз запустили скрипт из блокли, а потом он по кругу его выполняет).

Для автономного программирования бота не подходят блоки для обычного. Для этого они в блокли выделены разными цветами. Блоки для автономного программирования помечены [prog] в начале и могут быть использованы только в обёртке блока "Запрограммировать автономно".
Например вы можете в цикле выставить координаты по кругу (соответственно каждый раз добавляя блок "[prog] Двигать бот" с нужными координатами), запустить программу и увидеть, что даже после завершения программы в блокли, бот будет двигаться по кругу.



# Blockly

Google's Blockly is a library that adds a visual code editor to web and mobile apps. The Blockly editor uses interlocking, graphical blocks to represent code concepts like variables, logical expressions, loops, and more. It allows users to apply programming principles without having to worry about syntax or the intimidation of a blinking cursor on the command line.  All code is free and open source.

![](https://developers.google.com/blockly/images/sample.png)

## Getting Started with Blockly

Blockly has many resources for learning how to use the library. Start at our [Google Developers Site](https://developers.google.com/blockly) to read the documentation on how to get started, configure Blockly, and integrate it into your application. The developers site also contains links to:

* [Getting Started article](https://developers.google.com/blockly/guides/get-started/web)
* [Getting Started codelab](https://blocklycodelabs.dev/codelabs/getting-started/index.html#0)
* [More codelabs](https://blocklycodelabs.dev/)
* [Demos and plugins](https://google.github.io/blockly-samples/)

Help us focus our development efforts by telling us [what you are doing with
Blockly](https://developers.google.com/blockly/registration).  The questionnaire only takes
a few minutes and will help us better support the Blockly community.

### Installing Blockly

Blockly is [available on npm](https://www.npmjs.com/package/blockly).

```bash
npm install blockly
```

For more information on installing and using Blockly, see the [Getting Started article](https://developers.google.com/blockly/guides/get-started/web).

### Getting Help
* [Report a bug](https://developers.google.com/blockly/guides/modify/contribute/write_a_good_issue) or file a feature request on GitHub
* Ask a question, or search others' questions, on our [developer forum](https://groups.google.com/forum/#!forum/blockly). You can also drop by to say hello and show us your prototypes; collectively we have a lot of experience and can offer hints which will save you time. We actively monitor the forums and typically respond to questions within 2 working days.

### blockly-samples

We have a number of resources such as example code, demos, and plugins in another repository called [blockly-samples](https://github.com/google/blockly-samples/). A plugin is a self-contained piece of code that adds functionality to Blockly. Plugins can add fields, define themes, create renderers, and much more. For more information, see the [Plugins documentation](https://developers.google.com/blockly/guides/plugins/overview).

## Contributing to Blockly

Want to make Blockly better? We welcome contributions to Blockly in the form of pull requests, bug reports, documentation, answers on the forum, and more! Check out our [Contributing Guidelines](https://developers.google.com/blockly/guides/modify/contributing) for more information. You might also want to look for issues tagged "[Help Wanted](https://github.com/google/blockly/labels/help%20wanted)" which are issues we think would be great for external contributors to help with.

## Releases

We release by pushing the latest code to the master branch, followed by updating the npm package, our [docs](https://developers.google.com/blockly), and [demo pages](https://google.github.io/blockly-samples/). We typically release a new version of Blockly once a quarter (every 3 months). If there are breaking bugs, such as a crash when performing a standard action or a rendering issue that makes Blockly unusable, we will cherry-pick fixes to master between releases to fix them. The [releases page](https://github.com/google/blockly/releases) has a list of all releases.

We use [semantic versioning](https://semver.org/). Releases that have breaking changes or are otherwise not backwards compatible will have a new major version. Patch versions are reserved for bug-fix patches between scheduled releases.

We now have a [beta release on npm](https://www.npmjs.com/package/blockly?activeTab=versions). If you'd like to test the upcoming release, or try out a not-yet-released new API, you can use the beta channel with:

```bash
npm install blockly@beta
```
As it is a beta channel, it may be less stable, and the APIs there are subject to change.

### Branches

There are two main branches for Blockly.

**[master](https://github.com/google/blockly)** - This is the (mostly) stable current release of Blockly.

**[develop](https://github.com/google/blockly/tree/develop)** - This is where most of our work happens. Pull requests should always be made against develop. This branch will generally be usable, but may be less stable than the master branch. Once something is in develop we expect it to merge to master in the next release.

**other branches:** - Larger changes may have their own branches until they are good enough for people to try out. These will be developed separately until we think they are almost ready for release. These branches typically get merged into develop immediately after a release to allow extra time for testing.

### New APIs

Once a new API is merged into master it is considered beta until the following release. We generally try to avoid changing an API after it has been merged to master, but sometimes we need to make changes after seeing how an API is used. If an API has been around for at least two releases we'll do our best to avoid breaking it.

Unreleased APIs may change radically. Anything that is in `develop` but not `master` is subject to change without warning.

## Issues and Milestones

We typically triage all bugs within 2 working days, which includes adding any appropriate labels and assigning it to a milestone. Please keep in mind, we are a small team so even feature requests that everyone agrees on may not be prioritized.

### Milestones

**Upcoming release** - The upcoming release milestone is for all bugs we plan on fixing before the next release. This typically has the form of `year_quarter_release` (such as `2019_q2_release`). Some bugs will be added to this release when they are triaged, others may be added closer to a release.

**Bug Bash Backlog** - These are bugs that we're still prioritizing. They haven't been added to a specific release yet, but we'll consider them for each release depending on relative priority and available time.

**Icebox** - These are bugs that we do not intend to spend time on. They are either too much work or minor enough that we don't expect them to ever take priority. We are still happy to accept pull requests for these bugs.

## Good to Know

* Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com)
* We support IE11 and test it using [BrowserStack](https://browserstack.com)
