const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
const uploader = document.getElementById('img-uploader')
const detail = document.getElementById('detail')
const detailText = document.getElementById('detail-value')

uploader.addEventListener('change', (e) => {
    document.getElementById('file-label').innerHTML = e.target.files[0].name
})
detail.addEventListener('change', (e) => {
    detailText.innerHTML = 'Detail: ' + e.target.value
    if (e.target.value > 8) {
        detailText.innerHTML = 'Detail: ' + e.target.value + "<br>(high details = long loading)"

    }
})

document.getElementById('convert-btn').addEventListener('click', () => {
    //handle file uploading
    addAnimation(true)

    if (uploader.files[0]) {
        const reader = new FileReader()
        reader.onload = () => {
            const img = new Image()
            img.onload = function () {
                setTimeout(() => {
                    ctx.drawImage(img, 0, 0)
                    convertToAscii()
                });
                canvas.width = img.width
                canvas.height = img.height
            }
            img.src = reader.result
        }
        reader.readAsDataURL(uploader.files[0])
        document.body.appendChild(canvas)
    }

})

convertToAscii = () => {

    //const gs = ` '.^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$`
    //const gs = `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^'.`
    //const gs = `$p+,^'. `
    const gs = ` .'^,+p%`

    //const gs = ` iazOB`

    let asciiText = document.getElementById('ascii-img')
    let pixelsPerPass = 11 - Number.parseInt(document.getElementById('detail').value)
    asciiText.innerHTML = ''
    let asciiString = ''
    let counter = 0
    for (let i = 0; i < canvas.height; i += pixelsPerPass) {
        let str = ''
        for (let j = 0; j < canvas.width; j += pixelsPerPass) {
            let pixelData = canvas.getContext('2d').getImageData(j, i, pixelsPerPass, pixelsPerPass).data
            let avgPixel = (pixelData[0] + pixelData[1] + pixelData[2]) / 3
            let gsPercent = ((avgPixel - 1) / 255) * 100
            let gsSym = gs[Number.parseInt((gsPercent * gs.length) / 100)]
            str += ' ' + gsSym + ''
            counter++
        }
        asciiString += str + '<br>'
        //console.log(str)  
    }
    asciiText.innerHTML = asciiString
    addAnimation(false)
    //console.log(asciiText.innerHTML)
    // console.log('total pixels ' + counter)


    // canvas.addEventListener('mousemove', (e) => {
    //     //grayscale ascii code
    //     let pixelData = canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data
    //     let avgPixel = (pixelData[0] + pixelData[1] + pixelData[2]) / 3
    //     let gsPercent = (avgPixel / 255) * 100
    //     let gsSym = gs[Number.parseInt((gsPercent * gs.length) / 100)]
    //     document.getElementById('pixel-info').innerHTML = `${e.offsetX}, ${e.offsetY}, ${pixelData}, ${avgPixel}, ${gsSym}`
    //     // console.log(e.offsetX, e.offsetY, pixelData, avgPixel, gsPercent, gsSym)
    // })


}
function addAnimation(val) {
    document.getElementById('loading').style.display = val ? 'flex' : 'none'   
}