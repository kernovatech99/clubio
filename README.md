# Cash Application

Diese Web-Applikation soll ein Tool bereitstellen um Buchungen zu erfassen, ähnlich wie es größere Programme wie Datev für Firmen erledigen.

Zielgruppe sind kleinere Vereine, der Funktionsumfang ist also im Vergleich zur professionellen Buchhaltungs-Software deutlich eingeschränkter.

# Seiten

## Kassen

Dies ist die Haupt-Ansicht der App. Es werden alle Buchungen chronologisch dargestellt in einer Tabelle.

Spalten: Datum, Beschreibung, Empfänger, Betrag, Konto, Kostenstelle

Über der Tabelle ist eine Tab-Ansicht mit einem Tab für jede registrierte Kasse. Buchungen sind also in erster Linie nach Kassen gruppiert. Kassen sind dabei sowas wie "Orte, an denen Geld liegt", also z.B. Girokonto, Barkasse 1, Barkasse 2, Sparbuch, etc

## Konten

Konten sind Kategorien von Buchungen, z.B. Spenden, Mitgliedsbeiträge, Programm, Verpflegung, Transport, etc. Hier können die aktuellen Konten verwaltet werden.

Eine Buchung MUSS einem bestimmten Konto zugewiesen werden.

## Kostenstellen

Kostenstellen beschreiben, wofür eine Buchung gebraucht wird. Das sind i.d.R. Veranstaltungen, die einen bestimmten Zweck erfüllen, z.B. Sommerfest, Weihnachtsmarkt, etc. So lässt sich für eine Buchung sowohl die Art der Buchung (Konto), als auch der Sinn und Zweck (Kostenstelle) erfassen.

# Models

(sofern nicht anders angegeben sind Felder erforderlich)

## Kasse

Attribute: Name, Nummer

## Konto

Attribute: Name, Nummer, Farbe

## Kostenstelle

Attribute: Name, Nummer, Farbe

## Buchung

Attribute: Beschreibung, Empfänger (nullable), Konto_nr, Kasse, Quittung-Nr (nullable), Kostenstelle (nullable), Bemerkungen (nullable)

