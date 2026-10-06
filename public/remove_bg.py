from PIL import Image

def remove_white(infile, outfile):
    img = Image.open(infile)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # If R, G, B are all > 230, make it transparent
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(outfile, "PNG")

if __name__ == "__main__":
    remove_white("logo.jpg", "logo-true.png")
