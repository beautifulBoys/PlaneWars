
import img_bullet_t1_l1 from '../images/mine/bullet_t1_l1.png'
import img_plane_t1_l1 from '../images/mine/plane_t1_l1.png'

const images = {
  plane_t1_l1: { src: img_plane_t1_l1, img: null },
  bullet_t1_l1: { src: img_bullet_t1_l1, img: null }
}

function checkImgOnload () {
  let status = true
  for (let k in images) {
    if (!images[k].img) {
      status = false
      break
    }
  }
  return status
}
function initImageSource () {
  return new Promise((resolve, reject) => {
    for (let k in images) {
      let img = new Image()
      img.src = images[k].src
      img.onload = () => {
        images[k].img = img
        if (checkImgOnload()) {
          resolve({
            level: 1,
            money: 1000,
            diamond: 10,
            planeType: 1,
            planeLevel: 1,
            plane: {
              1: { // 飞机暂时不区分类型，这个先暂时为等级。
                remw: 1.1,
                remh: 1.5,
                img: images.plane_t1_l1.src,
                bulletId: 1,
                damage: 0, // 伤害
                hp: 200, // 血量
                armor: 4, // 护甲
              }
            },
            bullet: {
              1: {
                remw: 0.2, // 实际大小（rem）
                remh: 0.35, // 实际大小（rem）
                w: 0,
                h: 0,
                v: -10,
                img: images.bullet_t1_l1.img,
                time: 200,
                hurt: 10
              },
              2: {
                remw: 0.2,
                remh: 0.35,
                w: 0,
                h: 0,
                v: -10,
                img: images.bullet_t1_l1.img,
                time: 200,
                hurt: 10
              }
            }
          })
        }
      }
    }
  })
}
export default initImageSource
