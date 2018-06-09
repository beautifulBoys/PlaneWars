
import img_plane1 from '../images/enemy/plane1.png'
import img_plane2 from '../images/enemy/plane2.png'
import img_plane3 from '../images/enemy/plane3.png'
import img_bullet from '../images/enemy/bullet.png'

const images = {
  plane1: { src: img_plane1, img: null },
  plane2: { src: img_plane2, img: null },
  plane3: { src: img_plane3, img: null },
  bullet: { src: img_bullet, img: null }
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
            plane: {
              1: {
                remw: 0.8, // 实际大小（rem）
                remh: 0.7, // 实际大小（rem）
                img: images.plane1.img,
                bulletId: 1,
                shootSpeed: 2500,
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                v: 2,
                damage: 5, // 伤害
                hp: 10, // 血量
              },
              2: {
                remw: 0.8, // 实际大小（rem）
                remh: 0.7, // 实际大小（rem）
                img: images.plane2.img,
                bulletId: 1,
                shootSpeed: 3000,
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                v: 2.5,
                damage: 10, // 伤害
                hp: 15, // 血量
              },
              3: {
                remw: 0.8, // 实际大小（rem）
                remh: 0.7, // 实际大小（rem）
                img: images.plane3.img,
                bulletId: 1,
                shootSpeed: 3500,
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                v: 3,
                damage: 15, // 伤害
                hp: 20, // 血量
              }
            },
            bullet: {
              1: {
                remw: 0.15, // 实际大小（rem）
                remh: 0.15, // 实际大小（rem）
                img: images.bullet.img,
                w: 0,
                h: 0,
                v: 5,
                time: 1000,
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
