# Aufgaben für Bewerber Backendentwicklung

## Setup

Die Lösung aller Aufgaben erfolgt via HTML-Formular. Ein Backend nimmt die per HTTP POST gesendeten Daten der Aufgabe entgegen, berechnet eine Lösung und schreibt diese in ein valides HTML Dokument innnerhalb eines 'div' mit der ID 'solution', gefolgt von einem \<pre>. Die Lösungsdaten innerhalb dieses divs sind reiner Text. Also:

	<div id='solution'>
		<pre>
			Dies ist die Lösung.
		</pre>
	</div>

Programmiersprache (wie ggfs. Webserver, Framework, etc.) sind frei wählbar. Wir empfehlen Python, da wir dies hier benutzen.

## Testabdeckung

Eine Aufgabe gilt als erfüllt, wenn sie neben der korrekten Lösung eine plausible Testabdeckung hat. Es sollen Unittests und integrative Tests vorliegen. Akzeptanzkriterien sind aus dieser Aufgabenstellung abzuleiten.

## Umgebung

Die Lösung soll vom eigenen Rechner präsentiert werden.

## Beispiel

Entwicklung erfolgt in Python mit den Paketen aus dem pyramid Framework. Tests werden mit pytest geschrieben. Pytest erhält den selenium-webdriver, um neben den Units auch das Verhalten der Anwendung zu testen. Dieses Verhalten könnte - da pyramid eine WSGI-Anwendung ist - allerdings ebenso auf WSGI-Ebene mit einem Python-Testbrowser getestet werden. Eine komplette Server-Client Umgebung kann dann entfallen. Die Laufzeitumgebung ist eine venv oder Docker.

## Aufgabe 1

Gegeben sei ein Textabsatz. Schreiben Sie ein Programm, das den ersten kürzesten Textabschnitt anzeigt, welcher alle gegebenen Wörter k enthält. Ein Abschnitt ist kürzer, wenn er eine kleinere Anzahl Wörter enthält. Berücksichtigen Sie nur Buchstaben aus den Mustergruppen [A-Z] und [a-z]. Groß- und Kleinschreibung sollen bei Vergleichen nicht berücksichtigt werden. Wird kein Abschnitt gefunden, soll "KEIN ABSCHNITT GEFUNDEN" ausgegeben werden.

### Eingabeformat

	Ein toller Beispieltext ist der Blindtext. Er hat ein paar Wörter. Dies ist
	ein Beispieltext, der ein paar Wörter hat und auch noch ein paar mehr, um
	die Zeile etwas länger zu machen. Darüber hinaus ist er nur dafür da, um
	genügend Testtext zusammenzubekommen. Dem Text selbst macht das nicht so
	viel aus. Früher einmal mehr, als er noch nicht so selbstbewusst war. Heute
	kennt er seine Rolle als Blindtext und fügt sich selbstbewusst ein. Er ist
	ja irgendwie wichtig. Manchmal jedoch, ganz manchmal, weint er in der
	Nacht, weil er niemals bis zum Ende gelesen wird. Doch das hat ja jetzt zum
	Glück ein Ende.
	5
	ein
	Beispieltext
	der
	paar
	Wörter
	
### Ausgabetext
	Beispieltext der ein paar Wrter
	
### Erklärung
Im vorliegenden Fall enthält der Abschnitt "Beispieltext, der ein paar Wörter" alle gegebenen Wörter und ist der kürzeste Abschnitt im Text. Satzzeichen und Sonderzeichen sollen nicht ausgegeben werden. "Ein toller Beispieltext ist der Blindtext. Er hat ein paar Wörter." ist zwar auch ein zutreffender Abschnitt, jedoch nicht der kürzeste.

### Constraints
Anzahl der Zeichen ist nicht größer als 200.000
0 < k < Anzahl der Wörter im Absatz

## Aufgabe 2

Gegeben sei eine 2-dimensionale Matrix, die aus 1 und 0 besteht. Finden Sie die exakte Anzahl von miteinander verbundenen Einheiten.

### Erklärung
Eine verbundene Einheit ist eine Grupe einer oder mehrerer Zellen, die aus 1sen besteht. Verbunden sind sie, wenn sie in einer Nachbarschaftsbeziehung stehen. Nachbarn sind 1sen, die sich in einer der 8 möglichen Richtungen direkt umgeben (also N, NO, O, SO, S, SW, W, NW) Eine Zelle, die keinen direkten Nachbarn mit einer 1 hat, ist eine Einheit mit einer Zelle. Eine Zelle kann nicht Nachbar von sich selbst sein.

### Eingabeformat
Die erste Zeile enthält eine Zahl T, die Anzhal der Testfälle.
Es folgen T Testfälle. Jeder Testfall mit folgendem Format.
N (repräsentiert die Dimension NxN)
Gefolgt von N Zeilen mit N Zahlen pro Zeile

### Beispieleingabe
	4
	4
	0 0 1 0
	1 0 1 0
	0 1 0 0
	1 1 1 1
	4
	1 0 0 1
	0 0 0 0
	0 1 1 0
	1 0 0 1
	5
	1 0 0 1 1
	0 0 1 0 0
	0 0 0 0 0
	1 1 1 1 1
	0 0 0 0 0
	8
	0 0 1 0 0 1 0 0
	1 0 0 0 0 0 0 1
	0 0 1 0 0 1 0 1
	0 1 0 0 0 1 0 0
	1 0 0 0 0 0 0 0
	0 0 1 1 0 1 1 0
	1 0 1 1 0 1 1 0
	0 0 0 0 0 0 0 0

### Beispielausgabe
	1
	3
	3
	9
###Constraint
	0 < T < 6 
	0 < N < 1009