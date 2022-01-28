
# FloodFill using Tkinter
# pixel-based without animation

from Tkinter import *
root = Tk()
canvas = Canvas(root, width=250, height=250)
canvas.pack()

canvas.create_text(125,20,text="FloodFill Demo",font="Helvetica 16 bold")
canvas.create_text(125,40,text="left click = draw",font="Helvetica 12 italic")
canvas.create_text(125,60,text="shift-left or right click = fill",font="Helvetica 12 italic")

imgLeft = 75
imgTop = 75
imgWidth = 100
imgHeight = 100

img = PhotoImage(width=imgWidth, height=imgHeight)
canvas.create_image(imgLeft, imgTop, image=img, anchor=NW)

color1 = "#0000ff"
color2 = "#00ff00"
canvas.fillColor = color1
for x in range(imgWidth):
    for y in range(imgHeight):
        img.put(color1, to=(x,y))

def inImage(x, y):
    return ((x >= 0) and (x < imgWidth) and \
            (y >= 0) and (y < imgHeight))

def drawDot(x, y, color):
    r = 5
    for dx in range(-r,+r):
        for dy in range(-r,+r):
            if ((dx**2 + dy**2 <= r**2) and inImage(x+dx,y+dy)):
                img.put(color, to=(x+dx,y+dy))

def getColor(img, x, y):
    hexColor = "#%02x%02x%02x" % getRGB(img, x, y)
    return hexColor

def getRGB(img, x, y):
    value = img.get(x, y)
    return tuple(map(int, value.split(" ")))

def mousePressed(event, doFlood):
    x = event.x-imgLeft
    y = event.y-imgTop
    if (inImage(x,y)):
        color = getColor(img, x, y)
        if (color == color1):
            canvas.fillColor = color2
        else:
            canvas.fillColor = color1
        if (doFlood):
           floodFillWithLargeStack(x, y)
        else:
           drawDot(x, y, canvas.fillColor)

def leftMousePressed(event):
    shiftDown = ((event.state & 0x0001) == 1)
    mousePressed(event, shiftDown)

def leftMouseMoved(event):
    x = event.x-imgLeft
    y = event.y-imgTop
    if (inImage(x, y)):
        drawDot(x, y, canvas.fillColor)

def floodFill(x, y, color):
    if ((not inImage(x,y)) or (getColor(img, x, y) == color)):
        return
    img.put(color, to=(x, y))
    floodFill(x-1, y, color)
    floodFill(x+1, y, color)
    floodFill(x, y-1, color)
    floodFill(x, y+1, color)

def callWithLargeStack(f,*args):
    import sys
    import threading
    threading.stack_size(2**27)  # 64MB stack
    sys.setrecursionlimit(2**27) # will hit 64MB stack limit first
    # need new thread to get the redefined stack size
    def wrappedFn(resultWrapper): resultWrapper[0] = f(*args)
    resultWrapper = [None]
    #thread = threading.Thread(target=f, args=args)
    thread = threading.Thread(target=wrappedFn, args=[resultWrapper])
    thread.start()
    thread.join()
    return resultWrapper[0]

def floodFillWithLargeStack(x,y):
    callWithLargeStack(floodFill, x, y, canvas.fillColor)

def rightMousePressed(event):
    mousePressed(event, True)

canvas.bind("<Button-1>", leftMousePressed)
canvas.bind("<B1-Motion>", leftMouseMoved)
canvas.bind("<Button-3>", rightMousePressed)
root.mainloop()