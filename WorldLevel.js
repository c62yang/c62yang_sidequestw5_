class WorldLevel {

  constructor(levelJson) {

    this.name = levelJson.name ?? "Level";

    this.theme = Object.assign(
      { bg: "#000000", platform: "#333333", blob: "#ff8800" },
      levelJson.theme ?? {}
    );

    this.camLerp = levelJson.camera?.lerp ?? 0.03;

    this.w = levelJson.world?.w ?? 6000;
    this.h = levelJson.world?.h ?? 480;

    this.start = levelJson.start ?? { x: 100, y: 300, r: 26 };

    this.platforms = levelJson.platforms ?? [];

    this.symbols = levelJson.symbols ?? [];
  }

  drawWorld(player) {

    background(this.theme.bg);

    // stars (slow moving background)

    push();

    fill(255, 120);
    noStroke();

    for (let i = 0; i < 200; i++) {

      let x = (i * 200 + frameCount * 0.1) % this.w;
      let y = (i * 37) % 300;

      circle(x, y, 2);
    }

    pop();

    // platforms

    push();

    rectMode(CORNER);
    noStroke();
    fill(this.theme.platform);

    for (const p of this.platforms) {
      rect(p.x, p.y, p.w, p.h);
    }

    pop();

    // discoverable symbols

    for (const s of this.symbols) {

      let d = dist(player.x, player.y, s.x, s.y);

      if (d < 120) {

        push();

        fill(255);
        textSize(24);

        text(s.icon, s.x, s.y);

        pop();
      }
    }
  }
}
