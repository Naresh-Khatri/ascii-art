const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
const uploader = document.getElementById('img-uploader')
document.body.appendChild(canvas)

//handle file uploading
uploader.addEventListener('change', (e) => {
    if (e.target.files[0]) {
        const reader = new FileReader()
        reader.onload = () => {
            const img = new Image()
            img.onload = function() {
                setTimeout(() => {
                    ctx.drawImage(img, 0, 0)
                    convertToAscii()            
                });
                canvas.width = img.width
                canvas.height = img.height
            }
            img.src = reader.result
        }
        reader.readAsDataURL(e.target.files[0])
    }
})

convertToAscii = () => {

    //const gs = ` '.^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$`
    //const gs = `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^'.`
    //const gs = `$p+,^'. `
    const gs = ` .'^,+p%`

    //const gs = ` iazOB`

    let asciiText = document.getElementById('ascii-img')
    let details = Number.parseInt(document.getElementById('details').value)
    console.log(details)
    asciiText.innerHTML = ''
    // asciiText.style.width = img.width + 'px'
    // asciiText.style.height = img.height + 'px'
    let counter = 0
    for (let i = 0; i < canvas.height; i += details) {
        let str = ''
        for (let j = 0; j < canvas.width; j += details) {
            let pixelData = canvas.getContext('2d').getImageData(j, i, details, details).data
            let avgPixel = (pixelData[0] + pixelData[1] + pixelData[2]) / 3
            let gsPercent = ((avgPixel - 1) / 255) * 100
            let gsSym = gs[Number.parseInt((gsPercent * gs.length) / 100)]
            str += ' ' + gsSym
            counter++
        }
        asciiText.innerHTML += str + '<br>'
        //console.log(str)  
    }
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