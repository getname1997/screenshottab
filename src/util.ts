// @ts-ignore
import domtoimage from 'dom-to-image';
import hands from '@/assets/hand.svg'
let domBorder:any = null
const coordinate:any[] = []
const drawFrame = (coordinates:{x:number,y:number}) => {
    console.log(coordinate,coordinates)
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
const handOnMousedown= (e:any)=>{
    console.log(e,'看看e数据')
    document.onmousemove=(event)=>{
        // console.log('鼠标移动了',e,event.clientX,event.clientY)
        e.target.style.top = event.clientY - 50 + 'px'
        e.target.style.left= event.clientX - 50+ 'px'
    }
    document.onmouseup = handOnmouseup
}
const handOnmouseup = (e:any)=>{
    drawFrame({x:e.clientX,y:e.clientY})
    document.onmousemove = null
    document.onmouseup = null
}
const newShade = (dom:HTMLElement |null)=>{
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
const screenshot= (dom:HTMLElement |null,characteristic='') =>{
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
     hand.onmousedown = handOnMousedown
     document.body.appendChild(hand);
}


export {screenshot}
