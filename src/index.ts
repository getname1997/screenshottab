import domtoimage from 'dom-to-image'
import hands from './assets/hand.svg'
let domBorder:any = null
const coordinate:any[] = []
const drawFrame = (coordinates:{x:number,y:number}) => {
    coordinate.forEach(item =>{
        if(item.left<=coordinates.x && item.right>=coordinates.x && item.top<=coordinates.y && item.bottom >=coordinates.y){
            const  dom = document.querySelector('.domBorder')
            if(dom){
                dom.remove()
            }
            domBorder = document.createElement('div')
            domBorder.style.position = 'fixed'
            domBorder.className = 'domBorder'
            domBorder.style.top = item.top + 'px'
            domBorder.style.left = item.left + 'px'
            domBorder.style.width = item.right - item.left + 'px'
            domBorder.style.height = item.bottom - item.top + 'px'
            domBorder.style.border = '1px solid blue'
            document.body.appendChild(domBorder);
        }
    })
}
const isMobile= () => {
    let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return flag;
}
const handOnMousedown= (e:any)=>{
    document.onmousemove=(event)=>{
        e.target.style.top = event.clientY  + 'px'
        e.target.style.left= event.clientX -50 + 'px'
    }
    document.onmouseup = handOnmouseup
}
const handOnmouseup = (e:any)=>{
    drawFrame({x:e.clientX,y:e.clientY})
    document.onmousemove = null
    document.onmouseup = null
}
const newShade = (dom)=>{
    domtoimage.toPng(dom).then((dataUrl:any)=>{
        const imgs= new Image()
        imgs.src = dataUrl;
        imgs.style.position = 'fixed'
        imgs.style.top = String(0)
        imgs.style.left = String(0)
        imgs.style.width = '100vw'
        imgs.draggable = false
        imgs.style.height='100vh'
        document.body.appendChild(imgs);
    })
}
const handOntouchstart = (e:any)=>{
    document.ontouchmove=(event)=>{
        e.target.style.top = event.touches[0].clientY  + 'px'
        e.target.style.left= event.touches[0].clientX -50 + 'px'
    }
    document.ontouchend = (e:any)=>{
        drawFrame({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
        document.ontouchmove = null
        document.ontouchend = null
    }
}
const screenshot= (dom,characteristic='') =>{
    newShade(dom)
    const data = document.querySelectorAll(characteristic)
    data.forEach((item)=>{
        const uItem =item.getBoundingClientRect()
        coordinate.push({
            bottom:uItem.bottom,
            left:uItem.left,
            right:uItem.right,
            top:uItem.top,
        })
    })
    const hand= new Image()
    hand.src = hands
    hand.style.position = 'fixed'
    hand.style.top = '50px'
    hand.style.width = '100px'
    hand.draggable = false
    hand.style.left = '50px'
    hand.style.zIndex ='10000'
    if(isMobile()){
        hand.ontouchstart = handOntouchstart
        console.log('移动端')
    }else {
        hand.onmousedown = handOnMousedown
        console.log('pc端')
    }
        setTimeout(()=>{
            document.body.appendChild(hand);
        },200)
}
class Screenshot {
    constructor(dom,characteristic){
        screenshot(dom,characteristic)
    }
}

export {Screenshot,screenshot}
