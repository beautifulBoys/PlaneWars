
import img_bullet_t1_l1 from '../images/mine/bullet_t1_l1.png'
import img_bullet_t1_l2 from '../images/mine/bullet_t1_l2.png'
import img_plane_t1_l1 from '../images/mine/plane_t1_l1.png'

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
      v: -10,
      img: img_bullet_t1_l1,
      time: 200,
      hurt: 10
    },
    2: {
      remw: 0.15,
      remh: 0.35,
      w: 0,
      h: 0,
      v: -10,
      img: img_bullet_t1_l2,
      time: 200,
      hurt: 10
    }
  },
  plane: {
    1: {
      remw: 1.1, // 实际大小（rem）
      remh: 1.2, // 实际大小（rem）
      img: img_plane_t1_l1,
      damage: 0, // 伤害
      hp: 200, // 血量
      armor: 4, // 护甲
    },
    1: {
      remw: 1.3, // 实际大小（rem）
      remh: 1.5, // 实际大小（rem）
      img: img_plane_t1_l1,
      damage: 0, // 伤害
      hp: 200, // 血量
      armor: 4, // 护甲
    }
  }
}
export default MineConfig
