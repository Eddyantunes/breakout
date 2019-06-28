import * as JQuery from 'jquery';
import { OnInit } from "@angular/core";

interface IBlockData {
  style: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
  $elem: JQuery;
}

export class Breakout implements OnInit {

  public gameOver = false;
  public gameWon = false;
  public idMonde;

  private bodyClass = "breakout-body";

  public $breakoutElem: JQuery;
  public ball: HTMLDivElement[];
  public paddle: HTMLDivElement;
  public blocks: IBlockData[] = [];

  private paddleWidth = 200;
  private paddleWidth1 = 160;
  private paddleWidth2 = 120;
  private paddleWidth3 = 80;

  private paddleHeight = 14;
  private paddleFromBottom = 20;


  private paddlePos = Math.round((window.innerWidth - this.paddleWidth) / 2);
  private paddleName = "breakout-paddle";

  private ballPosX = this.paddlePos + Math.round(this.paddleWidth / 2);

  private ballSize = 20;
  private ballSize1 = 15;
  private ballSize2 = 10;
  private ballSize3 = 5;


  private ballPosY = window.innerHeight - this.paddleFromBottom - this.paddleHeight - this.ballSize;

  private ballSpeed = 8;
  private ballSpeed1 = 10;
  private ballSpeed2 = 15;
  private ballSpeed3 = 20;

  private ballDirX = 5;
  private ballDirY = -5;
  private ballName = "breakout-ball";

  private blockName = "breakout-block";
  private dataName = "breakout";

  ngOnInit() {
  }

  constructor(selector: string, private onExit: Function, public id) {
    // we only want one instance running at a time
    if (jQuery('.breakout-game').length) {
      return;
    }

    this.idMonde = id;

    if (this.idMonde) {
      this.makeStyles();
      this.createElements();
      this.prepBlocks(selector);
    }


    window.requestAnimationFrame(this.tick.bind(this));
  }

  public getRandomColor() {
    return "#" + (Math.round(Math.random() * 0XFFFFFF)).toString(16);
  }

  public destroy(): void {
    jQuery(document).off('mousemove.breakout');
    this.$breakoutElem
      .off()
      .remove();

    jQuery("." + this.blockName).each((index: number, elem: HTMLElement) => {
      let $elem: JQuery = jQuery(elem),
        data: IBlockData = $elem.data(this.dataName);

      if (data) {
        elem.style.cssText = data.style;
      }
      $elem.removeClass(this.blockName + " transparent");
    });

    jQuery(document.body).removeClass(this.bodyClass);
    this.onExit();
  }

  private createElements(): void {
    const $breakout: JQuery = jQuery(
      `<div class="breakout-game">
    <button class="exit" endGame>Get out</button>
    <div class="gameOver" endGame>Pull Request refused</div>
    <div class="gameWon" endGame>Take your chocolate</div>
    <div class="${this.paddleName}" style="left:${this.paddlePos}px"></div>
    <div class="${this.ballName}" style="left:0px; top:${this.ballPosY}px"></div>
    <div class="${this.ballName}" style="left:${this.ballPosX}px; top:${this.ballPosY}px"></div>
    <div class="${this.ballName}" style="left:${this.ballPosX}px; top:${this.ballPosY}px"></div>
    <div class="${this.ballName}" style="left:${this.ballPosX}px; top:${this.ballPosY}px"></div>

</div>`);

    $breakout.appendTo('body');
    this.$breakoutElem = $breakout;
    this.paddle = <HTMLDivElement>$breakout.find('.' + this.paddleName)[0];
    this.ball = <HTMLDivElement[]>$breakout.find('.' + this.ballName).toArray();

    jQuery(document.body).addClass(this.bodyClass);

    this.addEvents();
  }

  private endGame(): void {
    if (this.gameWon) {
      this.$breakoutElem.find('.gameWon').show();
    } else {
      this.$breakoutElem.find('.gameOver').show();
    }
  }

  private makeStyles(): void {
    const styleID = "breakoutStyles";
    if (!document.getElementById(styleID)) {
      if (this.idMonde == 1) {
        const css = `
.${this.bodyClass} {
    overflow: hidden;
}
.${this.paddleName} {
    background-color: red;
    border: 2px solid white;
    border-radius: 5px;
    bottom: ${this.paddleFromBottom}px;
    height: ${this.paddleHeight}px;
    position: fixed;
    width: ${this.paddleWidth}px;
    z-index: 999999;
}
.${this.ballName} {
    background-color: blue;
    border: 2px solid white;
    border-radius: ${this.ballSize / 2}px;
    height: ${this.ballSize}px;
    position: fixed;
    width: ${this.ballSize}px;
    z-index: 999999;
}
.${this.blockName} {
    z-index: 99999;
}
.${this.blockName}.transparent {
    opacity: 0 !important;
}
.${this.blockName}::before {
    border: 1px solid white;
    background-color: ${this.getRandomColor()};
    content: "";
    display: block;
    height: 100%;
    opacity: 0.5;
    position: absolute;
    width: 100%;
    z-index: 99999;
}
.exit {
    background: red;
    color: white;
    font-weight: bold;
    border: 0;
    border-radius: 0 0 0 5px;
    padding: 10px 20px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 99999;
}
.gameOver, .gameWon {
    background: red;
    color: white;
    cursor: pointer;
    display: none;
    font-size: 60px;
    font-weight: bold;
    font-family: Impact;
    left: 50%;
    padding: 0px 10px;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999999;
}
`;

        // tslint:disable-next-line:ban
        let elStyle: HTMLStyleElement = document.createElement('style');
        elStyle.id = styleID;

        elStyle.innerHTML = css;
        document.getElementsByTagName('head')[0].appendChild(elStyle);
      }
    } if (this.idMonde == 2) {
      const css = `
.${this.bodyClass} {
  overflow: hidden;
}
.${this.paddleName} {
  background-color: red;
  border: 2px solid white;
  border-radius: 5px;
  bottom: ${this.paddleFromBottom}px;
  height: ${this.paddleHeight}px;
  position: fixed;
  width: ${this.paddleWidth1}px;
  z-index: 999999;
}
.${this.ballName} {
  background-color: blue;
  border: 2px solid white;
  border-radius: ${this.ballSize1 / 2}px;
  height: ${this.ballSize1}px;
  position: fixed;
  width: ${this.ballSize1}px;
  z-index: 999999;
}
.${this.blockName} {
  z-index: 99999;
}
.${this.blockName}.transparent {
  opacity: 0 !important;
}
.${this.blockName}::before {
  border: 1px solid white;
  background-color: ${this.getRandomColor()};
  content: "";
  display: block;
  height: 100%;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  z-index: 99999;
}
.exit {
  background: red;
  color: white;
  font-weight: bold;
  border: 0;
  border-radius: 0 0 0 5px;
  padding: 10px 20px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
}
.gameOver, .gameWon {
  background: red;
  color: white;
  cursor: pointer;
  display: none;
  font-size: 60px;
  font-weight: bold;
  font-family: Impact;
  left: 50%;
  padding: 0px 10px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999;
}
`;

      // tslint:disable-next-line:ban
      let elStyle: HTMLStyleElement = document.createElement('style');
      elStyle.id = styleID;

      elStyle.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(elStyle);
    } if (this.idMonde == 3) {
      const css = `
.${this.bodyClass} {
  overflow: hidden;
}
.${this.paddleName} {
  background-color: red;
  border: 2px solid white;
  border-radius: 5px;
  bottom: ${this.paddleFromBottom}px;
  height: ${this.paddleHeight}px;
  position: fixed;
  width: ${this.paddleWidth2}px;
  z-index: 999999;
}
.${this.ballName} {
  background-color: blue;
  border: 2px solid white;
  border-radius: ${this.ballSize2 / 2}px;
  height: ${this.ballSize2}px;
  position: fixed;
  width: ${this.ballSize2}px;
  z-index: 999999;
}
.${this.blockName} {
  z-index: 99999;
}
.${this.blockName}.transparent {
  opacity: 0 !important;
}
.${this.blockName}::before {
  border: 1px solid white;
  background-color: ${this.getRandomColor()};
  content: "";
  display: block;
  height: 100%;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  z-index: 99999;
}
.exit {
  background: red;
  color: white;
  font-weight: bold;
  border: 0;
  border-radius: 0 0 0 5px;
  padding: 10px 20px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
}
.gameOver, .gameWon {
  background: red;
  color: white;
  cursor: pointer;
  display: none;
  font-size: 60px;
  font-weight: bold;
  font-family: Impact;
  left: 50%;
  padding: 0px 10px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999;
}
`;

      // tslint:disable-next-line:ban
      let elStyle: HTMLStyleElement = document.createElement('style');
      elStyle.id = styleID;

      elStyle.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(elStyle);
    } if (this.idMonde == 4) {
      const css = `
.${this.bodyClass} {
  overflow: hidden;
}
.${this.paddleName} {
  background-color: red;
  border: 2px solid white;
  border-radius: 5px;
  bottom: ${this.paddleFromBottom}px;
  height: ${this.paddleHeight}px;
  position: fixed;
  width: ${this.paddleWidth3}px;
  z-index: 999999;
}
.${this.ballName} {
  background-color: blue;
  border: 2px solid white;
  border-radius: ${this.ballSize3 / 2}px;
  height: ${this.ballSize3}px;
  position: fixed;
  width: ${this.ballSize3}px;
  z-index: 999999;
}
.${this.blockName} {
  z-index: 99999;
}
.${this.blockName}.transparent {
  opacity: 0 !important;
}
.${this.blockName}::before {
  border: 1px solid white;
  background-color: ${this.getRandomColor()};
  content: "";
  display: block;
  height: 100%;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  z-index: 99999;
}
.exit {
  background: red;
  color: white;
  font-weight: bold;
  border: 0;
  border-radius: 0 0 0 5px;
  padding: 10px 20px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
}
.gameOver, .gameWon {
  background: red;
  color: white;
  cursor: pointer;
  display: none;
  font-size: 60px;
  font-weight: bold;
  font-family: Impact;
  left: 50%;
  padding: 0px 10px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999;
}
`;

      // tslint:disable-next-line:ban
      let elStyle: HTMLStyleElement = document.createElement('style');
      elStyle.id = styleID;

      elStyle.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(elStyle);
    }
  }

  private addEvents(): void {
    jQuery(document).on('mousemove.breakout', this.movePaddle.bind(this));
    this.$breakoutElem.on('click', '[endGame]', this.destroy.bind(this));
  }

  private prepBlocks(selector: string): void {
    let scrollOffset: number = jQuery(window).scrollTop(),
      blocks: JQuery = jQuery(selector)
        .filter(':visible')
        .filter((index: number, element: HTMLElement) => {
          let pos: JQueryCoordinates = jQuery(element).offset();
          // nothing off the top of the visible screen or below the bottom 250 px
          return pos.top - scrollOffset >= 0 && pos.top - scrollOffset < window.innerHeight - 250;
        });

    if (!blocks.length) {
      // there is nothing to hit. Lets pretend this never happened.
      this.destroy();
      return;
    }

    blocks.each((index: number, elem: HTMLElement) => {
      let $elem: JQuery = jQuery(elem),
        elData: IBlockData = this.generateElemData($elem);

      this.blocks.push(elData);
      $elem.data(this.dataName, elData);
    });
    // addClass after we do the placement because the class has position fixed and will cause a re-draw.
    blocks.each((index: number, elem: HTMLElement) => {
      jQuery(elem).addClass(this.blockName);
    });
  }

  private generateElemData($elem: JQuery): IBlockData {
    let pos: JQueryCoordinates = $elem.offset(),
      // adjust for window scroll.
      scrollOffset: number = jQuery(window).scrollTop();

    return {
      left: pos.left,
      right: pos.left + $elem.width(),
      top: pos.top - scrollOffset,
      bottom: pos.top + $elem.height() - scrollOffset,
      style: $elem[0].style.cssText,
      $elem: $elem
    };
  }

  private movePaddle(event: JQueryMouseEventObject): void {
    // keep paddle within the bounds of the screen
    if (this.idMonde == 1) {
      this.paddlePos = Math.max(0,
        Math.min(event.pageX - Math.round(this.paddleWidth / 2), window.innerWidth - this.paddleWidth - 4)
      );
      this.paddle.style.left = this.paddlePos + "px";
    }if (this.idMonde == 2) {
      this.paddlePos = Math.max(0,
        Math.min(event.pageX - Math.round(this.paddleWidth1 / 2), window.innerWidth - this.paddleWidth1 - 4)
      );
      this.paddle.style.left = this.paddlePos + "px";
    }if (this.idMonde == 3) {
      this.paddlePos = Math.max(0,
        Math.min(event.pageX - Math.round(this.paddleWidth2 / 2), window.innerWidth - this.paddleWidth2 - 4)
      );
      this.paddle.style.left = this.paddlePos + "px";
    }if (this.idMonde == 4) {
      this.paddlePos = Math.max(0,
        Math.min(event.pageX - Math.round(this.paddleWidth3 / 2), window.innerWidth - this.paddleWidth3 - 4)
      );
      this.paddle.style.left = this.paddlePos + "px";
    }
  }

  public tick(): void {
    this.moveBall();

    if (this.gameOver || this.gameWon) {
      this.endGame();
    } else {
      // INFINITE LOOP!
      window.requestAnimationFrame(this.tick.bind(this));
    }
  }

  private moveBall(): void {
    // optimistic that we will continue to move forward.
    this.ballPosX += this.ballDirX;
    this.ballPosY += this.ballDirY;

    let inBlock: number = this.inBlock();
    if (this.hasCollideVert() || inBlock != -1) {
      // reverse the Y move
      this.ballDirY *= -1;
      this.ballPosY += this.ballDirY;
      if (inBlock != -1 && inBlock == this.inBlock()) {
        // oops that didn't help. Lets re-reverse. Horz will fix it.
        this.ballDirY *= -1;
        this.ballPosY += this.ballDirY;
      } else if (inBlock != -1) {
        this.removeBlock(inBlock);
      }
    }

    inBlock = this.inBlock();
    if (this.hasCollideHorz() || inBlock != -1) {
      // reverse the X move
      this.ballDirX *= -1;
      this.ballPosX += this.ballDirX;
      if (inBlock != -1) {
        this.removeBlock(inBlock);
      }
    }

    let paddleHit: number = this.paddleHit();
    if (paddleHit != -1) {
      // 140 is the max angle that we want out of the paddle
      // + 20 to center the angle
      let ang: number = paddleHit / this.paddleWidth * 140 + 20;
      // negating this.ballSpeed because we want the paddle to direct the ball up.
      if (this.idMonde == 1) {
        this.ballDirY = Math.sin(ang * Math.PI / 180) * -this.ballSpeed;
        this.ballDirX = Math.cos(ang * Math.PI / 180) * -this.ballSpeed;
      }
      if (this.idMonde == 2) {
        this.ballDirY = Math.sin(ang * Math.PI / 180) * -this.ballSpeed1;
        this.ballDirX = Math.cos(ang * Math.PI / 180) * -this.ballSpeed1;
      }
      if (this.idMonde == 3) {
        this.ballDirY = Math.sin(ang * Math.PI / 180) * -this.ballSpeed2;
        this.ballDirX = Math.cos(ang * Math.PI / 180) * -this.ballSpeed2;
      }
      if (this.idMonde == 4) {
        this.ballDirY = Math.sin(ang * Math.PI / 180) * -this.ballSpeed3;
        this.ballDirX = Math.cos(ang * Math.PI / 180) * -this.ballSpeed3;
      }
    }

    // did the ball fall off the bottom of the screen
    if (this.ballPosY >= window.innerHeight) {
      this.gameOver = true;
    }

    this.ball[0].style.left = this.ballPosX + "px";
    this.ball[0].style.top = this.ballPosY + "px";
    this.ball[1].style.left = this.ballPosX + "px";
    this.ball[1].style.top = this.ballPosY + "px";
    this.ball[2].style.left = this.ballPosX + "px";
    this.ball[2].style.top = this.ballPosY + "px";
    this.ball[3].style.left = this.ballPosX + "px";
    this.ball[3].style.top = this.ballPosY + "px";

  }

  // Used to detect ball vertical collision that isn't a block or paddle
  private hasCollideVert(): boolean {
    return this.ballPosY < 0;
  }

  // Used to detect ball horizontal collision that isn't a block or paddle
  private hasCollideHorz(): boolean {
    if (this.idMonde == 1) {
      return (this.ballPosX + this.ballSize > window.innerWidth - 4) ||
        (this.ballPosX < 0);
    } if (this.idMonde == 2) {
      return (this.ballPosX + this.ballSize1 > window.innerWidth - 4) ||
        (this.ballPosX < 0);
    } if (this.idMonde == 3) {
      return (this.ballPosX + this.ballSize2 > window.innerWidth - 4) ||
        (this.ballPosX < 0);
    } if (this.idMonde == 4) {
      return (this.ballPosX + this.ballSize3 > window.innerWidth - 4) ||
        (this.ballPosX < 0);
    }
  }

  // NOTE: This algorithm doesn't work if we are moving fast enough to pass right over a block instead of inside it.
  private inBlock(): number {
    if (this.idMonde == 1) {
      for (let i = 0; i < this.blocks.length; i++) {
        if (this.ballPosX + this.ballSize >= this.blocks[i].left &&
          this.ballPosX <= this.blocks[i].right &&
          this.ballPosY + this.ballSize >= this.blocks[i].top &&
          this.ballPosY <= this.blocks[i].bottom
        ) {
          return i;
        }
      }
      return -1;
    } if (this.idMonde == 2) {
      for (let i = 0; i < this.blocks.length; i++) {
        if (this.ballPosX + this.ballSize1 >= this.blocks[i].left &&
          this.ballPosX <= this.blocks[i].right &&
          this.ballPosY + this.ballSize1 >= this.blocks[i].top &&
          this.ballPosY <= this.blocks[i].bottom
        ) {
          return i;
        }
      }
      return -1;
    } if (this.idMonde == 3) {
      for (let i = 0; i < this.blocks.length; i++) {
        if (this.ballPosX + this.ballSize2 >= this.blocks[i].left &&
          this.ballPosX <= this.blocks[i].right &&
          this.ballPosY + this.ballSize2 >= this.blocks[i].top &&
          this.ballPosY <= this.blocks[i].bottom
        ) {
          return i;
        }
      }
      return -1;
    } if (this.idMonde == 4) {
      for (let i = 0; i < this.blocks.length; i++) {
        if (this.ballPosX + this.ballSize3 >= this.blocks[i].left &&
          this.ballPosX <= this.blocks[i].right &&
          this.ballPosY + this.ballSize3 >= this.blocks[i].top &&
          this.ballPosY <= this.blocks[i].bottom
        ) {
          return i;
        }
      }
      return -1;
    }
  }

  /**
   * Did the ball hit the paddle from the top? If so, return the location of the collision from the left edge. If not -1
   */
  private paddleHit(): number {
    if (this.idMonde == 1 && this.ballPosX + this.ballSize >= this.paddlePos &&
      this.ballPosX <= this.paddlePos + this.paddleWidth &&
      // current pos is on or below the paddle
      this.ballPosY + this.ballSize >= window.innerHeight - this.paddleFromBottom - this.paddleHeight &&
      // last position was above the paddle
      this.ballPosY - this.ballDirY < window.innerHeight - this.paddleFromBottom - this.paddleHeight
    ) {
      return this.ballPosX - this.paddlePos;
    } if (this.idMonde == 2 && this.ballPosX + this.ballSize >= this.paddlePos &&
    this.ballPosX <= this.paddlePos + this.paddleWidth1 &&
    // current pos is on or below the paddle
    this.ballPosY + this.ballSize >= window.innerHeight - this.paddleFromBottom - this.paddleHeight &&
    // last position was above the paddle
    this.ballPosY - this.ballDirY < window.innerHeight - this.paddleFromBottom - this.paddleHeight
  ) {
    return this.ballPosX - this.paddlePos;
  }if (this.idMonde == 3 && this.ballPosX + this.ballSize >= this.paddlePos &&
    this.ballPosX <= this.paddlePos + this.paddleWidth2 &&
    // current pos is on or below the paddle
    this.ballPosY + this.ballSize >= window.innerHeight - this.paddleFromBottom - this.paddleHeight &&
    // last position was above the paddle
    this.ballPosY - this.ballDirY < window.innerHeight - this.paddleFromBottom - this.paddleHeight
  ) {
    return this.ballPosX - this.paddlePos;
  }if (this.idMonde == 4 && this.ballPosX + this.ballSize >= this.paddlePos &&
    this.ballPosX <= this.paddlePos + this.paddleWidth3 &&
    // current pos is on or below the paddle
    this.ballPosY + this.ballSize >= window.innerHeight - this.paddleFromBottom - this.paddleHeight &&
    // last position was above the paddle
    this.ballPosY - this.ballDirY < window.innerHeight - this.paddleFromBottom - this.paddleHeight
  ) {
    return this.ballPosX - this.paddlePos;
  }
  return -1;
}


  private removeBlock(i: number): void {
    this.blocks[i].$elem.addClass('transparent');
    this.blocks.splice(i, 1);

    if (!this.blocks.length) {
      this.gameWon = true;
    }
  }
}
