
import img_bullet from '../images/mine/bullet.png'
import img_plane from '../images/mine/plane.png'

const MineConfig = {
  level: 1,
  money: 1000,
  diamond: 10,
  planeType: 1,
  planeLevel: 1,
  bullet: {
    1: {
      remw: 0.2, // 实际大小（rem）
      remh: 0.35, // 实际大小（rem）
      w: 0,
      h: 0,
      v: 10,
      img: img_bullet,
      time: 200,
      hurt: 10
    },
    2: {
      remw: 0.2,
      remh: 0.35,
      w: 0,
      h: 0,
      v: 10,
      img: img_bullet,
      time: 200,
      hurt: 10
    }
  },
  plane: {
    1: {
      remw: 1.1,
      remh: 1.2,
      img: img_plane,
      damage: 0, // 伤害
      hp: 200, // 血量
      armor: 4, // 护甲
    }
  }
}
export default MineConfig
