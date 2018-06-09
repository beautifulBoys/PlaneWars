let enemyPlaneIndex = 1

function update_mine_config (MineConfig) {
  let minePlane = MineConfig.plane[MineConfig.planeLevel]
  let mineBullet = MineConfig.bullet[minePlane.bulletId]
  return {
    bullet: {
      ...mineBullet,
      w: window.fontSize * mineBullet.remw,
      h: window.fontSize * mineBullet.remh
    },
    plane: {
      ...minePlane,
      w: window.fontSize * minePlane.remw,
      h: window.fontSize * minePlane.remh,
      x: screen.availWidth  / 2,
      y: screen.availHeight - 130
    }
  }
}

function update_enemy_config (EnemyConfig, planeId) {
  let enemyPlane = EnemyConfig.plane[planeId]
  let enemyBullet = EnemyConfig.bullet[enemyPlane.bulletId]

  let w = (screen.availWidth - 50) / 20
  let left = 25 + parseInt(Math.random() * 20) * w

  return {
    bullet: {
      ...enemyBullet,
      w: window.fontSize * enemyBullet.remw,
      h: window.fontSize * enemyBullet.remh
    },
    plane: {
      ...enemyPlane,
      id: enemyPlaneIndex++,
      w: window.fontSize * enemyPlane.remw,
      h: window.fontSize * enemyPlane.remh,
      x: left - (window.fontSize * enemyPlane.remw / 2),
      y: -50
    }
  }
}

export default {
  update_mine_config,
  update_enemy_config
}
