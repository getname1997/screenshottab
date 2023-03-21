import domtoimage from 'dom-to-image'
import select from "@/assets/select1.png";
import type {paramsType} from '@/type';

let domBorder: any = null
const button = document.createElement('button')
const button1 = document.createElement('button')
const canvas = document.createElement('canvas')
let MasterNode:any = null
const coordinate: any[] = []
const drawFrame = (coordinates: { x: number, y: number }) => {
    coordinate.forEach(item => {
        if (item.left <= coordinates.x && item.right >= coordinates.x && item.top <= coordinates.y && item.bottom >= coordinates.y) {
            const dom = document.querySelector('.domBorder')
            if (dom) {
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
            MasterNode.appendChild(domBorder);
        }
    })
}
const isMobile = () => {
    let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return flag;
}
const handOnMousedown = (e: any) => {
    document.onmousemove = (event) => {
        e.target.style.top = event.clientY + 'px'
        e.target.style.left = event.clientX - 50 + 'px'
    }
    document.onmouseup = handOnmouseup
}
const handOnmouseup = (e: any) => {
    drawFrame({x: e.clientX, y: e.clientY})
    document.onmousemove = null
    document.onmouseup = null
}
const newShade = () => {
    const shade = document.createElement('div')
    shade.style.position = 'fixed'
    shade.style.top = '0'
    shade.style.left = '0'
    shade.style.width = '100%'
    shade.style.height = '100%'
    shade.style.backgroundColor = 'rgba(0,0,0,0.1)'
    shade.style.zIndex = '5'
    shade.className += 'createName'
    MasterNode.appendChild(shade);
}
const handOntouchstart = (e: any) => {
    document.ontouchmove = (event) => {
        e.target.style.top = event.touches[0].clientY + 'px'
        e.target.style.left = event.touches[0].clientX - 50 + 'px'
    }
    document.ontouchend = (e: any) => {
        drawFrame({x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY});
        document.ontouchmove = null
        document.ontouchend = null
    }
}
const clears = ()=>{
    const data = document.querySelectorAll('.createName')
    data.forEach(item=>{
        item.remove()
    })
    const dom = document.querySelector('.domBorder')
    if (dom) {
        dom.remove()
    }
    button.remove()
}

const screenshot = (dom: any, characteristic = '') => {
    MasterNode = dom
    newShade()
    const data = document.querySelectorAll(characteristic)
    data.forEach((item) => {
        const uItem = item.getBoundingClientRect()
        coordinate.push({
            bottom: uItem.bottom,
            left: uItem.left,
            right: uItem.right,
            top: uItem.top,
        })
    })
    const hand = new Image()
    hand.src = select
    hand.style.position = 'fixed'
    hand.style.top = '50px'
    hand.style.width = '100px'
    hand.draggable = false
    hand.style.left = '50px'
    hand.style.zIndex = '10000'
    hand.className += 'createName'
    if (isMobile()) {
        hand.ontouchstart = handOntouchstart
    } else {
        hand.onmousedown = handOnMousedown
    }
    setTimeout(() => {
        MasterNode.appendChild(hand);
        button.style.position = 'fixed'
        button.style.bottom = '50px'
        button.style.zIndex = '10'
        button.onclick= clears
        button.innerHTML='取消'
        button1.innerHTML = '确认'
        button1.style.position = 'fixed'
        button1.style.bottom = '50px'
        button1.style.right = '50px'
        button1.style.zIndex = '10'
        button1.onclick= preserve
        MasterNode.appendChild(button);
        MasterNode.appendChild(button1);
    }, 200)
}

const preserve = ()=>{
    button.remove()
    button1.remove()
    // const data = document.querySelectorAll('.createName')
    // data.forEach(item=>{
    //     item.remove()
    // })
    let dom:any = document.querySelector('body')
    domtoimage.toJpeg(dom, { quality: 0.95 }).then((dataUrl: any)=>
    {
            console.log(dataUrl)
            var link = document.createElement('a');
            link.download = 'a.png';
            link.href = dataUrl;
            link.click();
            clears()
        }
    ).catch(function (error: any) {
        clears()
        console.log(error, '截图失败!')
    })
}

class Screenshot {
    constructor(params: paramsType) {
        screenshot(params.dom, params.characteristic)
    }

    clear() {
        clears()
    }
}

export {Screenshot, screenshot}
