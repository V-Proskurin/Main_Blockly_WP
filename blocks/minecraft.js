//функция для обновленя даныных в блоках
function getPositionsObject(id='',var_object= 'drone',var_pos = 'x') {
    let  timerId_get_pos=[];
    timerId_get_pos[var_object+'_'+var_pos] = setInterval(() => {
        fetch('https://server.x1team.ru:8089/poll/'+NickName)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                try {
                    block = workspace.getBlockById(id);
                    if (block.getInput(var_object+'_'+var_pos).fieldRow[0].value_ !== data[var_object][var_pos]) {
                        block.getInput(var_object+'_'+var_pos).fieldRow[0].value_ = data[var_object][var_pos];//поменять player на  drone
                        workspace.refreshTheme()
                    }
                }
                catch {
                    clearInterval(timerId_get_pos[var_object+'_'+var_pos]);
                }
            });
    }, 1000);
    return timerId_get_pos;
}

function getCheckBlock(id, var_object) {
    let  timerId_get_block=[];
    timerId_get_block[var_object] = setInterval(() => {
        fetch('https://server.x1team.ru:8089/poll/'+NickName)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                try {
                    block = workspace.getBlockById(id);
                    block.getInput(var_object).fieldRow[0].value_ = data[var_object];
                    workspace.refreshTheme()					

                }
                catch {
                    clearInterval(timerId_get_block[var_object]);
                }
            });
    }, 1000);	

	
    return timerId_get_block;
}

//подключаем созданный блок

Blockly.Blocks['minecraft_wait_a_fn'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Ждем выполнения функции");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Ждем выполнения функции ");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_connect'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Создать дрона.")
            .appendField("Личный мир")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "world")
			.appendField("мобы")
			.appendField(new Blockly.FieldCheckbox("FALSE"), "mob");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(255);
        this.setTooltip("Главный блок программы. Устанавливает соединение с сервером, создаёт дрона и настраивает начальные данные");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['minecraft_build'] = {
      init: function () {
      this.appendDummyInput()
			.appendField(new Blockly.FieldVariable('build_block'), "blocktype")
			.appendField("напр.")
			.appendField(new Blockly.FieldDropdown([["восток", "EAST"], ["север", "NORTH"], ["юг", "SOUTH"], ["запад", "WEST"], ["верх", "UP"], ["низ", "DOWN"]]), "dir");	

      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#cc0000");
      this.setTooltip("Строить");
      this.setHelpUrl("");
    }
};


Blockly.Blocks['minecraft_moveDrone'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Двигать дрона")
            .appendField(new Blockly.FieldDropdown([["вперёд", "front"], ["назад", "back"], ["лево", "left"], ["право", "right"], ["вверх", "up"], ["вниз", "down"]]), "Type")
            .appendField("шаг");
		this.appendValueInput("step") .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Двигать дрона в заданном направлении с заданным шагом");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_botToPlayer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Телепортировать ")
            .appendField(new Blockly.FieldDropdown([["дрон к хозяину", "botToPlayer"], ["хозяина к дрону", "playerToBot"]]), "Type");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Телепортирует дрон к вам");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['minecraft_drone_x'] = {
    init: function() {
        this.appendDummyInput().appendField("дрон X:");
        this.appendDummyInput("drone_x") .appendField(new Blockly.FieldNumber(0), "drone_coord_x");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour("#cc0000");
        this.setTooltip("Координаты дрона X");
        this.setHelpUrl("");
    },
    onchange: function (changeEvent) {
        if (!this.isInsertionMarker_ && !this.disposed && this.flyoutRect_ === undefined && this.rendered && this.workspace !== null && changeEvent.type === Blockly.Events.CREATE) {
            if (workspace.getBlockById(changeEvent.blockId).type === 'minecraft_drone_x') {
                getPositionsObject( this.id, 'drone','x');
            }
        }
    }
};
//-----------------------------------
Blockly.Blocks['minecraft_drone_y'] = {
    init: function() {
        this.appendDummyInput().appendField("дрон Y:");
        this.appendDummyInput("drone_y") .appendField(new Blockly.FieldNumber(0), "drone_coord_y");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour("#cc0000");
        this.setTooltip("Координаты дрона Y");
        this.setHelpUrl("");
    },
    onchange: function (changeEvent) {
        if (!this.isInsertionMarker_ && !this.disposed && this.flyoutRect_ === undefined && this.rendered && this.workspace !== null && changeEvent.type === Blockly.Events.CREATE) {
            if (workspace.getBlockById(changeEvent.blockId).type === 'minecraft_drone_y') {
                getPositionsObject( this.id, 'drone','y');
            }
        }
    }
};
//-----------------------------------
Blockly.Blocks['minecraft_drone_z'] = {
    init: function() {
        this.appendDummyInput().appendField("дрон Z:");
        this.appendDummyInput("drone_z") .appendField(new Blockly.FieldNumber(0), "drone_coord_z");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour("#cc0000");
        this.setTooltip("Координаты дрона Z");
        this.setHelpUrl("");
    },
    onchange: function (changeEvent) {
        if (!this.isInsertionMarker_ && !this.disposed && this.flyoutRect_ === undefined && this.rendered && this.workspace !== null && changeEvent.type === Blockly.Events.CREATE) {
            if (workspace.getBlockById(changeEvent.blockId).type === 'minecraft_drone_z') {
                getPositionsObject( this.id, 'drone','z');
            }
        }
    }
};

//-----------------------------------

Blockly.Blocks['minecraft_player_x'] = {
    init: function() {
        this.appendDummyInput().appendField("Игрок X:");
        this.appendDummyInput("player_x") .appendField(new Blockly.FieldNumber(0), "player_coord_x");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour("#0000FF");
        this.setTooltip("Координаты игрока X");
        this.setHelpUrl("");
    },
    onchange: function (changeEvent) {
        if (!this.isInsertionMarker_ && !this.disposed && this.flyoutRect_ === undefined && this.rendered && this.workspace !== null && changeEvent.type === Blockly.Events.CREATE) {
            if (workspace.getBlockById(changeEvent.blockId).type === 'minecraft_player_x') {
                getPositionsObject( this.id, 'player','x');
            }
        }
    }
};

Blockly.Blocks['minecraft_player_y'] = {
    init: function() {
        this.appendDummyInput().appendField("Игрок Y:");
        this.appendDummyInput("player_y") .appendField(new Blockly.FieldNumber(0), "player_coord_y");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour("#0000FF");
        this.setTooltip("Координаты игрока Y");
        this.setHelpUrl("");
    },
    onchange: function (changeEvent) {
        if (!this.isInsertionMarker_ && !this.disposed && this.flyoutRect_ === undefined && this.rendered && this.workspace !== null && changeEvent.type === Blockly.Events.CREATE) {
            if (workspace.getBlockById(changeEvent.blockId).type === 'minecraft_player_y') {
                getPositionsObject( this.id, 'player','y');
            }
        }
    }
};


Blockly.Blocks['minecraft_player_z'] = {
    init: function() {
        this.appendDummyInput().appendField("Игрок Z:");
        this.appendDummyInput("player_z") .appendField(new Blockly.FieldNumber(0), "player_coord_z");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour("#0000FF");
        this.setTooltip("Координаты игрока Z");
        this.setHelpUrl("");
    },
    onchange: function (changeEvent) {
        if (!this.isInsertionMarker_ && !this.disposed && this.flyoutRect_ === undefined && this.rendered && this.workspace !== null && changeEvent.type === Blockly.Events.CREATE) {
            if (workspace.getBlockById(changeEvent.blockId).type === 'minecraft_player_z') {
                getPositionsObject( this.id, 'player','z');
            }
        }
    }
};


Blockly.Blocks['minecraft_tpdrone'] = {
    init: function () {
        this.appendDummyInput().appendField("Телепортировать дрон на");
        this.appendDummyInput().appendField("x:");
        this.appendValueInput("tpdrone_x") .setCheck("Number");
        this.appendDummyInput().appendField("y:");
        this.appendValueInput("tpdrone_y") .setCheck("Number");
        this.appendDummyInput().appendField("z:");
        this.appendValueInput("tpdrone_z") .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Телепортировать дрон *");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_summon'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Создать")
            .appendField(new Blockly.FieldDropdown([["Курица", "Chicken"], ["Корова", "Cow"], ["Волк", "Wolf"], ["Свинья", "Pig"], ["Овца", "Sheep"], ["Кролик", "Rabbit"], ["Лошадь", "Horse"], ["Оцелот", "Ocelot"], ["Житель", "Villager"], ["Зомби", "Zombie"], ["Скелет", "Skeleton"], ["Крипер", "Creeper"], ["Паук", "Spider"]]), "Type");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(359);
        this.setTooltip("Призывает сущность");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['minecraft_time'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Время в мире (час)")
            .appendField(new Blockly.FieldNumber(0), "time");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(359);
        this.setTooltip("Время на сервере");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_weather'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Погода на сервере")
            .appendField(new Blockly.FieldDropdown([["солнечная", "clear"], ["дождь", "rain"], ["буря", "thunder"]]), "Type")
			.appendField("мин. продолж.")
			.appendField(new Blockly.FieldNumber(0), "duration");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(359);
        this.setTooltip("Погода на сервере");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['minecraft_text'] = {
    init: function () {
		this.appendDummyInput().appendField("Текст в чат");
		this.appendDummyInput()
            .appendField("цвет")
            .appendField(new Blockly.FieldDropdown([["зелёный", "green"], ["жёлтый", "yellow"], ["красный", "red"]]), "color");
		this.appendValueInput("mctext") .setCheck("String");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(359);
        this.setTooltip("Текст в чат");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['minecraft_getchat'] = {
    init: function() {
        this.appendDummyInput().appendField("Текст в чате:");
        this.appendDummyInput("chatmessage") .appendField(new Blockly.FieldTextInput('null'), "player_chat");
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour(359);
        this.setTooltip("Считывает текст в чате");
        this.setHelpUrl("");
    },
    onchange: function (changeEvent) {
        if (!this.isInsertionMarker_ && !this.disposed && this.flyoutRect_ === undefined && this.rendered && this.workspace !== null && changeEvent.type === Blockly.Events.CREATE) {
            if (workspace.getBlockById(changeEvent.blockId).type === 'minecraft_getchat') {
                getCheckBlock( this.id, 'chatmessage');
            }
        }
    }
	
};

Blockly.Blocks['minecraft_checkblockdronedata'] = {
    init: function() {
        this.appendDummyInput().appendField("Тип блока на месте дрона");
        this.appendDummyInput("blockMaterial") .appendField(new Blockly.FieldTextInput('null'), "scheckblockdronedata");
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour("#0079db");
        this.setTooltip("Выводит тип блока на месте где стоит дрон");
        this.setHelpUrl("");
    },
    onchange: function (changeEvent) {
        if (!this.isInsertionMarker_ && !this.disposed && this.flyoutRect_ === undefined && this.rendered && this.workspace !== null && changeEvent.type === Blockly.Events.CREATE) {
            if (workspace.getBlockById(changeEvent.blockId).type === 'minecraft_checkblockdronedata') {
                getCheckBlock( this.id, 'blockMaterial');
            }
        }
    }

};

Blockly.Blocks['minecraft_mineblock'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Добыть блок");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Добывает блок на месте дрона в инвентарь игрока");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_craft'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Скрафтить предмет: ")
            .appendField(new Blockly.FieldDropdown([["Палка", "stick"], ["Доски", "oak_planks"], ["Деревянный меч", "wooden_sword"]]), "item")
			      .appendField("Кол-во: ")
			      .appendField(new Blockly.FieldNumber(1), "count");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(255);
        this.setTooltip("Крафтит предмет из имеющихся вещей и помещает его в инвентарь");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_nearfront'] = {
    init: function() {
        this.appendDummyInput().appendField("Тип блока впереди");
        this.appendDummyInput("block_front") .appendField(new Blockly.FieldTextInput('null'), "near_block_front");
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour("#cc0000");
        this.setTooltip("Тип блока рядом с дроном (перед - куда направлены руки у дрона)");
        this.setHelpUrl("");
    },
    onchange: function (changeEvent) {
        if (!this.isInsertionMarker_ && !this.disposed && this.flyoutRect_ === undefined && this.rendered && this.workspace !== null && changeEvent.type === Blockly.Events.CREATE) {
            if (workspace.getBlockById(changeEvent.blockId).type === 'minecraft_nearfront') {
                getCheckBlock( this.id, 'block_front');
            }
        }
    }

};

Blockly.Blocks['minecraft_nearbehind'] = {
    init: function() {
        this.appendDummyInput().appendField("Тип блока сзади");
        this.appendDummyInput("block_behind") .appendField(new Blockly.FieldTextInput('null'), "near_block_behind");
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour("#cc0000");
        this.setTooltip("Тип блока рядом с дроном (перед - куда направлены руки у дрона)");
        this.setHelpUrl("");
    },
    onchange: function (changeEvent) {
        if (!this.isInsertionMarker_ && !this.disposed && this.flyoutRect_ === undefined && this.rendered && this.workspace !== null && changeEvent.type === Blockly.Events.CREATE) {
            if (workspace.getBlockById(changeEvent.blockId).type === 'minecraft_nearbehind') {
                getCheckBlock( this.id, 'block_behind');
            }
        }
    }

};

Blockly.Blocks['minecraft_nearleft'] = {
    init: function() {
        this.appendDummyInput().appendField("Тип блока слева");
        this.appendDummyInput("block_left") .appendField(new Blockly.FieldTextInput('null'), "near_block_left");
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour("#cc0000");
        this.setTooltip("Тип блока рядом с дроном (перед - куда направлены руки у дрона)");
        this.setHelpUrl("");
    },
    onchange: function (changeEvent) {
        if (!this.isInsertionMarker_ && !this.disposed && this.flyoutRect_ === undefined && this.rendered && this.workspace !== null && changeEvent.type === Blockly.Events.CREATE) {
            if (workspace.getBlockById(changeEvent.blockId).type === 'minecraft_nearleft') {
                getCheckBlock( this.id, 'block_left');
            }
        }
    }

};

Blockly.Blocks['minecraft_nearright'] = {
    init: function() {
        this.appendDummyInput().appendField("Тип блока справа");
        this.appendDummyInput("block_right") .appendField(new Blockly.FieldTextInput('null'), "near_block_right");
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour("#cc0000");
        this.setTooltip("Тип блока рядом с дроном (перед - куда направлены руки у дрона)");
        this.setHelpUrl("");
    },
    onchange: function (changeEvent) {
        if (!this.isInsertionMarker_ && !this.disposed && this.flyoutRect_ === undefined && this.rendered && this.workspace !== null && changeEvent.type === Blockly.Events.CREATE) {
            if (workspace.getBlockById(changeEvent.blockId).type === 'minecraft_nearright') {
                getCheckBlock( this.id, 'block_right');
            }
        }
    }

};

Blockly.Blocks['minecraft_playnote'] = {
    init: function () {
		    this.appendDummyInput().appendField("Проигрывать. Октава");
		    this.appendDummyInput()
			      .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "octave")
			      .appendField("тон")
            .appendField(new Blockly.FieldDropdown([["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"], ["G", "G"]]), "tone")
			      .appendField("инструмент")
			      .appendField(new Blockly.FieldDropdown([["Банджо", "BANJO"], ["Большой барабан", "BASS_DRUM"], ["Бас-гитара", "BASS_GUITAR"], ["Колокол", "BELL"], ["Бит", "BIT"], ["Звон", "CHIME"], ["Колокольчик", "COW_BELL"], ["Диджериду", "DIDGERIDOO"], ["Флейта", "FLUTE"], ["Гитара", "GUITAR"], ["Железный ксилофон", "IRON_XYLOPHONE"], ["Пианино", "PIANO"], ["Плинг", "PLING"], ["Малый барабан", "SNARE_DRUM"], ["Палочки", "STICKS"], ["Ксилофон", "XYLOPHONE"]]), "instrument");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(359);
        this.setTooltip("Проигрывает возле дрона ноту с установленными параметрами");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_if'] = {
    init: function () {
		    this.appendDummyInput().appendField("Если");
		    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["Блок в дроне", "blockin"], ["Блок слева", "blockleft"], ["Блок справа", "blockright"], ["Блок сзади", "blockback"]]), "whatif");
		    this.appendDummyInput().appendField("==")
			      .appendField(new Blockly.FieldVariable('mc_val_if'), "valif");
		    this.appendDummyInput().appendField("то");
		    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["вперёд", "front"], ["назад", "back"], ["лево", "left"], ["право", "right"], ["Вверх", "up"], ["Вниз", "down"]]), "whatthen");
		    this.appendDummyInput().appendField(new Blockly.FieldNumber(1), "valthen");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Условный блок Minecraft контролирующий движение");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_movehand'] = {
    init: function () {
		    this.appendDummyInput().appendField("Двигать ");
		    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["руками", "hand"], ["ногами", "leg"]]), "type");
		    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["правой", "right"], ["левой", "left"]]), "what");
		    this.appendDummyInput().appendField("x");
		    this.appendValueInput("x") .setCheck("Number");
		    this.appendDummyInput().appendField("y");
		    this.appendValueInput("y") .setCheck("Number");
		    this.appendDummyInput().appendField("z");
		    this.appendValueInput("z") .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Двигает руками дрона в зависимости от заданных координат");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_getdroneblock'] = {
	init: function() {
		this.appendDummyInput()
			  .appendField("(async) Запрос данных с сервера в")
			  .appendField(new Blockly.FieldVariable('response'), "response");
		this.appendStatementInput("otherCode")
			  .setCheck(null)
			  .appendField("от БОТ: ")
			  .appendField(new Blockly.FieldCheckbox("FALSE"), "bot");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(255);
		this.setTooltip("Асинхронная функция. Берёт данные сервера на текущем шаге и обрабатывает их");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['minecraft_getServer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Запрос данных")
			      .appendField(new Blockly.FieldVariable('response'), "response")
			      .appendField("от БОТ: ")
			      .appendField(new Blockly.FieldCheckbox("FALSE"), "bot");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(255);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_setBlockData'] = {
	init: function() {
		this.appendDummyInput().appendField("Перенести данные блока");
		this.appendDummyInput().appendField(new Blockly.FieldVariable('block_data'), "blockData");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
		this.setColour("#cc0000");
		this.setTooltip("Из данных блока полностью воссаздаёт блок на месте дрона");
		this.setHelpUrl("");	
	
	}
};

Blockly.Blocks['minecraft_jsonParse'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("JSON разбор");
		    this.appendValueInput("server_string");
		    this.appendDummyInput()
			      .appendField(new Blockly.FieldDropdown([["Дрон/бот","drone"], ["Игрок","player"], ["Блоки рядом","botNearBlock"], ["Карта блоков","botMap"], ["Сущности рядом","botNearEntity"], ["Инвентарь (для бота)","inventory"]]), "type");
        this.appendDummyInput()
            .appendField("Параметр:");
		    this.appendValueInput("data");
	    	this.appendDummyInput()
            .appendField("Записать в")
			      .appendField(new Blockly.FieldVariable('server_data'), "server_data");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(255);
        this.setTooltip("Справка:\n Дрон/бот: x,y,z, hp(только для бота) \n Игрок: x,y,z,chat \n Для блоки рядом: front, behind, in, left, right(такиеже с приставкой _data) \n Для карты блоков: доп. блок координат из раздела minecraft \n Для мобов: чило (радиус) \n Инвентарь: номер слота");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_coordBlock'] = {
    init: function() {
        this.appendDummyInput().appendField("Координаты X");
        this.appendValueInput("x").setCheck("Number");
		    this.appendDummyInput().appendField("Y");
		    this.appendValueInput("y").setCheck("Number");
		    this.appendDummyInput().appendField("Z");
		    this.appendValueInput("z").setCheck("Number");
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour(255);
        this.setTooltip("Блок координат");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_droneSputnik'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Создать БОТ")
			      .appendField("ближайший моб:")
			      .appendField(new Blockly.FieldCheckbox("TRUE"), "zaxvat")
			      .appendField("или")
			      .appendField(new Blockly.FieldDropdown([["Человек","PLAYER"], ["Зомби","ZOMBIE"], ["Житель","VILLAGER"], ["Корова","COW"]]), "mob_type");
        this.appendDummyInput()
            .appendField("имя:");
		    this.appendValueInput("mob_name");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Создаёт бота");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_momentmove'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Движение на шаг, напр.")
			      .appendField(new Blockly.FieldDropdown([["x+1", "x+1"], ["x-1", "x-1"], ["z+1", "z+1"], ["z-1", "z-1"]]), "dir");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Освобождает спутника от контроля");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_sputnikCraft'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Скрафтить предмет: ")
			      .appendField(new Blockly.FieldVariable('craft_block'), "item");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Крафтит предмет из инвентаря бота");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_sputnikmineblock'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Добыть блок впереди");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Добывает блок на месте дрона в инвентарь игрока");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_sputnikInvSlot'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Положить в руку слот в инвентаре: ");
		    this.appendValueInput("slot").setCheck("Number");;
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Крафтит предмет из инвентаря бота");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_sputnikBuild'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Строить блок из руки бота")
			      .appendField("напр.")
			      .appendField(new Blockly.FieldDropdown([["восток", "EAST"], ["север", "NORTH"], ["юг", "SOUTH"], ["запад", "WEST"]]), "dir");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Строить");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_unSputnik'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Освободить спутника");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Освобождает спутника от контроля");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_sputnikProg'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Запрограммировать автономно.");
        this.appendDummyInput()
            .appendField("Скин по имени:");
		    this.appendValueInput("mob_name");
		    this.setInputsInline(true);
		    this.appendStatementInput("otherCode")
			      .setCheck(null);        
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff9494");
        this.setTooltip("Программируемый бот (для блоков [prog]). Команды выполняются только после завершения блока. Повторение зациклено.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_progSputnikMove'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("[prog] Двигать БОТ за дроном")
			      .appendField(new Blockly.FieldCheckbox("TRUE"), "drone")
			      .appendField("или на");
		    this.appendDummyInput().appendField("x:");
        this.appendValueInput("x") .setCheck("Number");
        this.appendDummyInput().appendField("y:");
        this.appendValueInput("y") .setCheck("Number");
        this.appendDummyInput().appendField("z:");
        this.appendValueInput("z") .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff9494");
        this.setTooltip("Спутник начинает следить за дроном или пойдёт на координаты");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_progSputnikAtack'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("[prog] Атаковать моба");
		    this.appendValueInput("mob_type");
		    this.appendDummyInput()
            .appendField("в радиусе");
		    this.appendValueInput("radius").setCheck("Number");;
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff9494");
        this.setTooltip("Если бот в указанном радиусе найдёт указанного моба, он атакует его");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_tpBot'] = {
    init: function () {
        this.appendDummyInput().appendField("Телепортировать бот на");
        this.appendDummyInput().appendField("x:");
        this.appendValueInput("tpbot_x") .setCheck("Number");
        this.appendDummyInput().appendField("y:");
        this.appendValueInput("tpbot_y") .setCheck("Number");
        this.appendDummyInput().appendField("z:");
        this.appendValueInput("tpbot_z") .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Телепортировать бот на координаты");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_playerToBot'] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Телепортирует вас к боту");
        this.setHelpUrl("");
    }
};
