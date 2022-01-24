from turtle import color
import numpy as np
import time
from tkinter import *

## parametros iniciais
tamanhoTela = 450
tamanhoPixel = int(tamanhoTela / 50)

## criar o canvas utilizando o tkinter
master = Tk()
tela = Canvas(master, background='#ffffff', width=tamanhoTela, height=tamanhoTela)
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
  print("pintando pontos reais: ",x1,"|", "|",y1,"|", x1 + tamanhoPixel, "|",y1 - tamanhoPixel)

# Desenha um pixel menor no centro do pixel maior 
def PixelCentro(x,y,cor):
  x1, y1 = ConverterCoordenadas(x, y)
  ids = tela.create_rectangle(x1+5, y1-5, (x1 + tamanhoPixel)-5, (y1 - tamanhoPixel)+5, fill=cor)

def polilinhas():
  def bresenham(x1, y1, x2, y2):
  #vetor que guarda os pontos iniciais que irão ser aplicados no alg de Bresenham
    ptIniciais = [x1, y1, x2, y2]

    print("\nPontos iniciais = ({},{}),({},{})\n".format(ptIniciais[0], ptIniciais[1], ptIniciais[2], ptIniciais[3]))

    #valores de delta para aplicarmos na condicação de teste da 1° octante
    deltaX = x2-x1
    deltaY = y2-y1
    
    #este vetor guardará os booleanos das trocas realizadas ou não na função de reflexão, para posteriormente fazer a reflexão para octante original.
    #boolsTroca[0] = trocaxy
    #boolsTroca[1] = trocax
    #boolsTroca[2] = trocay
    boolsTroca = [False, False, False]

    def reflexao(x1,y1,x2,y2):
      if deltaX != 0:
        m = deltaY/deltaX
      else:
        m = deltaY

      if m>1 or m<-1:
        print("fazendo troca de x->y\n")
        aux = 0
        #trocando os valores do par (x1,y1)
        aux = ptIniciais[0]
        ptIniciais[0] = ptIniciais[1]
        ptIniciais[1] = aux

        #trocando os valores do par (x2,y2)
        aux = ptIniciais[2]
        ptIniciais[2] = ptIniciais[3]
        ptIniciais[3] = aux
        boolsTroca[0] = True
      if x1>x2:
        print("fazendo reflexão em x1 e x2\n")
        ptIniciais[0] = ptIniciais[0]*(-1)
        ptIniciais[2] = ptIniciais[2]*(-1)
        boolsTroca[1]= True
      if y1>y2:
        print("fazendo reflexão em y1 e y2\n")
        ptIniciais[1] = ptIniciais[1]*(-1)
        ptIniciais[3] = ptIniciais[3]*(-1)
        boolsTroca[2] = True

    #verificando se os pontos estão na primeira condição, caso uma das condições seja satisfeita os pontos NÃO estão na primeira octante.
    if deltaX < deltaY or deltaX<0 or deltaY<0:
      reflexao(x1,y1,x2,y2)
      print("Pontos Refletidos = ({},{}),({},{})".format(ptIniciais[0], ptIniciais[1], ptIniciais[2], ptIniciais[3]))


    def algoritmoB(ptIniciais):
      x1 = ptIniciais[0]
      y1 = ptIniciais[1]
      x2 = ptIniciais[2]
      y2 = ptIniciais[3]

      m = (y2-y1)/(x2-x1)
      e = m - 0.5

      #esta variável guarda uma cópia do valor de y1, para incrementá-lo.
      aux = y1
      aux2 = x1

      #vetores que guardam os valores de y e x que foram calculados pelo alg de breseham 
      ptsY = [y1]
      ptsX = [x1]

      for i in range(int(x1), int(x2)):
        if e>0:
          aux+=1
          ptsY.append(aux)
          e-=1
        else:
          ptsY.append(aux)
        e=e+m

        aux2+=1
        ptsX.append(aux2)
      #boolsTroca[0] = trocaxy
      #boolsTroca[1] = trocax
      #boolsTroca[2] = trocay
      if boolsTroca[0] == True:
          aux = ptsX
          ptsX = ptsY
          ptsY = aux
      if boolsTroca[1] == True:
        for i in range(0, len(ptsY)):
          ptsX[i] = ptsX[i]*-1
      if boolsTroca[2] == True:
        for i in range(0, len(ptsY)):
          ptsY[i] = ptsY[i]*-1
      return [ptsX, ptsY]

    paresOrdenados = algoritmoB(ptIniciais)

    return paresOrdenados

  #---------------------------------------------
  n = int(input("Digite o número de pontos: "))

  #vetores que armazenam os vértices que ligam as polilinhas
  ptsX = []
  ptsY = []

  # Vetores que armazenam os vértices como pontos críticos
  ptscX = []
  ptscY = []

  #vetores que armazenam os pontos rasterizados pelo alg de bresenham
  ptx = []
  pty = []
  for i in range(1,n+1):
    print("ponto {}".format(i))
    x = int(input("x: "))
    ptsX.append(x)
    ptscX.append(x)
    y = int(input("y: "))
    ptsY.append(y)
    ptscY.append(y)

  for i in range(0,n-1):
    aux = bresenham(ptsX[i], ptsY[i], ptsX[i+1], ptsY[i+1])
    pts_x = aux[0]
    ptx += pts_x
    pts_y = aux[1]
    pty += pts_y

  return[ptx, pty, ptscX, ptscY]

def getPColor(x, y):

    # Converte as coordenadas para o sistema de grade
    x1,y1 = ConverterCoordenadas(x,y)
    # Achar todos os ids do retangulo (x, y, x, y)
    ids = tela.find_overlapping(x1+5,y1-5, (x1 + tamanhoPixel)-5, (y1 - tamanhoPixel)+5)
 

    # Se for encontrado objetos
    
    if ids: 
        # Recebe ID do ultimo objeto (top most)
        index = ids[-1]

        # Recebe a cor do retângulo
        color = tela.itemcget(index, "fill")
        print("ponto id:",index)
        print ("Pontos reais :",x1+2,"|",y1+2,"|", (x1 + tamanhoPixel)-2,"|", (y1 - tamanhoPixel)-2)
        return color
    # Se não tiver nenhum ponto, retorna o padrão branco - background

    return '#808080' # default color 

def FloodFill(x,y):
  print("Pontos :",x ,"|" ,y)
  current = getPColor(x,y)
  print ("Cor atual:",current)

  if (current == '#808080' or current == '#f00'):
      DesenharPixel(x,y,'#15734d')
      print("Desenhando Pontos:",x ,"|" ,y)
      master.update()
      time.sleep(0.5)
      print("FloodFill direita")
      FloodFill(x+1,y)
      time.sleep(0.5)
      print("FloodFill cima")
      FloodFill(x,y+1)
      time.sleep(0.5)
      print("FloodFill esquerda")
      FloodFill(x-1,y)
      time.sleep(0.5)
      print("FloodFill baixo")
      FloodFill(x,y-1)
      print ("fim do loop")    
      

CriarTemplate()
polilinhas = polilinhas()
ptsX = polilinhas[0]
ptsY = polilinhas[1]

for i in range(len(ptsX)):
  master.update()
  DesenharPixel(ptsX[i],ptsY[i], '#b31d72')
  PixelCentro(ptsX[i],ptsY[i],"#fcf003")
  time.sleep(0.1)

x = int(input("ponto inicial x: "))  
y = int(input("ponto inicial y: "))
FloodFill(x,y)
print ("Fim do algoritmo")
mainloop()
