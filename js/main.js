var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    //game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    //game.load.image('tiles-1', 'assets/tiles-1.png');
    game.load.image('face', 'assets/awesomeface.png');
    //game.load.spritesheet('droid', 'assets/droid.png', 32, 32);
    //game.load.image('starSmall', 'assets/star.png');
    //game.load.image('starBig', 'assets/star2.png');
    //game.load.image('background', 'assets/background2.png');
    //game.load.image('Vector', 'assets/arrow.png');
    game.load.image('cookie', 'assets/cookie.jpg');
    game.load.image('veggie', 'assets/broccoli.jpg');
    game.load.audio('music', 'assets/Carrots be Orange.mp3');
    game.load.image('end', 'assets/end_bg.png');
    game.load.image('excla', 'assets/excla.png');
    game.load.audio('gameoover','assets/gameover.mp3');
    game.load.audio('GET','assets/GET.wav');
    game.load.audio('ping','assets/wrong.wav');
    game.load.audio('MOAR','assets/key.wav');


    //game.load.audio('jump', 'assets/spaceman.wav');

}
var Player;
//var jumpTimer = 0;
var cursors;
var music;
var musicoff;
var musicon;
var veggie;
var cookie;
var cookiesTotal = 0;
var veggiesTotal = 0;
var cookies;
var veggies;
var cancookie = false;
var veggies_eaten = 0;
var veg = 5;
var coo = 5;
var score = 0;
var lives = 3;
var time;
//var gameon = 3600000;
var endbg;
var scoretxt;
var timetxt;//will refer to lives now.
var timestr = "Lives: ";
var gscoretxt;
var gscorestr = "Score: ";
var made = 0;
var excla;
//sound effects;
var GET;
var gameoover;
var ping;
var MOAR;

Cookie = function (index, game, player) {

    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.player = player;
    this.alive = true;

    this.cookie = game.add.sprite(x, y, 'cookie', 'cookie');

    //this.shadow.anchor.set(0.5);
    this.cookie.anchor.set(0.5);
    //this.turret.anchor.set(0.3, 0.5);

    this.cookie.name = index.toString();
    game.physics.enable(this.cookie, Phaser.Physics.ARCADE);
    //this.cookie.body.immovable = false;
    this.cookie.body.collideWorldBounds = true;
    //this.cookie.body.bounce.setTo(1, 1);

    //this.tank.angle = game.rnd.angle();

    //game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

};
Veggie = function (index, game, player) {

    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.player = player;
    this.alive = true;

    this.veggie = game.add.sprite(x, y, 'veggie', 'veggie');

    //this.shadow.anchor.set(0.5);
    this.veggie.anchor.set(0.5);
    //this.turret.anchor.set(0.3, 0.5);

    this.veggie.name = index.toString();
    game.physics.enable(this.veggie, Phaser.Physics.ARCADE);
    //this.cookie.body.immovable = false;
    this.veggie.body.collideWorldBounds = true;
    //this.cookie.body.bounce.setTo(1, 1);

    //this.tank.angle = game.rnd.angle();

    //game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

};

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#ED8B03';

    Player = game.add.sprite(32, 32, 'face');
    game.physics.enable(Player, Phaser.Physics.ARCADE);
    Player.body.collideWorldBounds = true;
    excla = game.add.sprite(Player.x + 10,Player.y - 30, 'excla');
    excla.visible = false;
    
    cookies = [];
    cookiesTotal = 5;
    //enemiesAlive = 20;
    veggies = [];
    veggiesTotal = 5;
    
    for (var i = 0; i < cookiesTotal; i++)
    {
        cookies.push(new Cookie(i, game, Player));
        //new Cookie(5, game, Player);
    }
    for (var i = 0; i < veggiesTotal; i++)
    {
        veggies.push(new Veggie(i, game, Player));
        //new Veggie(5, game, Player);
    }

    //player.animations.add('left', [0, 1, 2, 3], 10, true);
    //player.animations.add('turn', [4], 20, true);
    //player.animations.add('right', [5, 6, 7, 8], 10, true);
    
    //Make text for charge.
    //chargeText = game.add.text(player.x -10, player.y - 10, fuelstring + fuel, { font: '12px Arial', fill: '#fff' });
    //scoretxt = game.add.text(10, 50, score, { font: '24px Arial', fill: '#fff' });
    //scoretxt.visible = false;
    
    timetxt = game.add.text(10, 10, timestr + lives, { font: '12px Arial', fill: '#fff' });
    
    gscoretxt = game.add.text(10, 30, gscorestr + score, { font: '12px Arial', fill: '#fff' });
    

    cursors = game.input.keyboard.createCursorKeys();
    //jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
    //jumpButton = cursors.up;
    musicoff = game.input.keyboard.addKey(Phaser.Keyboard.M);
    musicon = game.input.keyboard.addKey(Phaser.Keyboard.N);
    music = game.add.audio('music');
    music.loop = true;
    music.play();
    
    endbg = game.add.sprite(0,0, 'end');
    endbg.visible = false;

    //That horrid jump sound.
    //jump = game.add.audio('jump');
    //jump.volume = 0.1;
    //sound effects:
    gameoover = game.add.audio('gameoover');
    GET = game.add.audio('GET');
    ping = game.add.audio('ping');
    MOAR = game.add.audio('MOAR');

}

function update() {
        if (veggies_eaten == 10)
            {
            cancookie = true;
            excla.visible = true;
            }
        else
            excla.visible = false;
        if (veggies_eaten > 10)
            veggies_eaten = 10;

        for (var i = 0; i < cookies.length; i++)
        {
            if (cookies[i].alive)
            {
                game.physics.arcade.overlap(Player, cookies[i].cookie, ate_cookie, null, this);
            }
        }
        for (var i = 0; i < veggies.length; i++)
        {
            if (veggies[i].alive)
            {
                game.physics.arcade.overlap(Player, veggies[i].veggie, ate_veggie, null, this);
            }
        }
    timetxt.text = timestr + lives;
    gscoretxt.text = gscorestr + score;
    excla.x = Player.x + 10;
    excla.y = Player.y - 30;
    
        if (musicoff.isDown)
            music.pause();
        if (musicon.isDown)
            music.resume();
        /*chargeText.x = player.x - 10;
        chargeText.y = player.y - 10;    
        chargeText.text = fuelstring + fuel;*/

        Player.body.velocity.x = 0;
        Player.body.velocity.y = 0;
    if (lives > 0)
    {
        if (cursors.left.isDown)
        {
            Player.body.velocity.x = -300;
        }
        if (cursors.right.isDown)
        {
            Player.body.velocity.x = 300;
        }
        if (cursors.up.isDown)
        {
            Player.body.velocity.y = -300;
        }
        if (cursors.down.isDown)
        {
            Player.body.velocity.y = 300;
        }
    }
            //game.physics.arcade.velocityFromAngle(sprite.angle, 300, player.body.velocity);
            //soundeffect.play();
                timetxt.text = timestr + lives;
                //scoretxt.text = score;
                //gameon = gameon - 1;
    if (lives <= 0)
        {
    //After the game ends:
    endbg.visible = true;
    endbg.bringToTop();
    //gameoover.play();
            if (made == 0);
                {
                    scoretxt = game.add.text(300, 250, score, { font: '100px Arial', fill: '#fff' });
                    music.stop();
                    made = 1;
                    //game.add.gamemover();
                }
    //scoretxt.visible = true;
    //scoretxt.bringToFront();
        }
}
//function gameover (){
//    gameoover.play();
//};
function ate_cookie (Player, cOOkie) {

    cOOkie.kill();
    cookies.push(new Cookie(coo, game, Player));
    if (cancookie == true)
        {
            score = score + 25;//sound here
            MOAR.play();
        }
    else
        {
            score = score - 25;
            lives = lives - 1;
            ping.play();
        }
    cancookie = false;
    veggies_eaten = 0;

}
function ate_veggie (Player, veGGie) {

    veGGie.kill();
    veggies.push(new Veggie(veg, game, Player));
    veggies_eaten++;
    score++;
    GET.play();

}

function render () {

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}