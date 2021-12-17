from tkinter import *

## parametros iniciais
tamanhoTela = 600
tamanhoPixel = int(tamanhoTela / 50)

## criar o canvas utilizando o tkinter
master = Tk()
tela = Canvas(master, width=tamanhoTela, height=tamanhoTela)
tela.pack()

## função que cria a grade
def CriarTemplate():
  aux = int(tamanhoTela / 2) + (tamanhoPixel / 2)

  for x in range(0, tamanhoTela, tamanhoPixel): # linhas horizontais
    tela.create_line(x, 0, x, tamanhoTela, fill='#808080')

  for y in range(0, tamanhoTela, tamanhoPixel): # linhas horizontais
    tela.create_line(0, y, tamanhoTela, y, fill='#808080')

  tela.create_line(0, aux - tamanhoPixel, tamanhoTela, aux - tamanhoPixel, fill="#f00") # linha central - horizontal
  tela.create_line(aux, 0, aux, tamanhoTela, fill="#f00") # linha central - vertical


def ConverterCoordenadas(x, y): # converter coordenadas para o sistema de grade
  real_x = int((tamanhoPixel * x) + (tamanhoTela / 2))
  real_y = int((tamanhoTela / 2) - (tamanhoPixel * y))

  return real_x, real_y


def DesenharPixel(x, y, cor): # desenha um pixel na grade
  x1, y1 = ConverterCoordenadas(x, y)
  tela.create_rectangle(x1, y1, x1 + tamanhoPixel, y1 - tamanhoPixel, fill=cor)

def Bresenham(x,y,cor):
  countA = 0
  countB = 0
  for countA in range (8):
    DesenharPixel(x, y, cor)
    x += 1
    countB +=  1
    if countB%2 == 0:
      y -= 1

def Circulo(x,y,cor):
  DesenharPixel((x - 3), y , cor)
  DesenharPixel((x - 3), y - 1, cor)
  DesenharPixel((x - 3), y + 1, cor)
  DesenharPixel((x + 3), y , cor)
  DesenharPixel((x + 3), y - 1, cor)
  DesenharPixel((x + 3), y + 1, cor)
  DesenharPixel(x, y + 3, cor)
  DesenharPixel((x - 2), y + 2, cor)
  DesenharPixel((x - 3), y + 3,cor)
  DesenharPixel((x + 1), y + 3, cor)

CriarTemplate()

#Bresenham(2,3,'#f00')
Circulo(0,0,"#f25")

mainloop()

