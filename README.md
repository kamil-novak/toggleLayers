# Widget Add Secure Layer
Widget umožňuje přepínat vrstvy v rámci jedné mapové služby. Vybraná vrstva se v mapě nastaví jako viditelná, ostatní vrstvy se vypnou. Příkladem využití může být mapová služba s několika vrstvami, které referencují stejná data, přičemž každá vrstva dává na data pomocí různé symboliky jiný pohled.<br>

Pomocí widgetu lze zároveň vypnout viditelnost celé mapové služby.<br>

![Image 004](https://user-images.githubusercontent.com/57621708/222716660-da96a98e-0daa-4632-988f-efa9570e19ec.png)
![Image 006](https://user-images.githubusercontent.com/57621708/222716673-160993dd-bf85-481a-9712-add66a3efefd.png)

Widget lze konfigurovat pouze pro mapové služby typu MAP SERVICE (resp. vrstvy typu MAP IMAGE LAYER). Více v části **Nastavení widgetu**.

# Nastavení widgetu
## Mapa
Widget mapy s požadovanou mapovou službou, jejíž vrstvy chceme pomocí widgetu přepínat. Widget spolupracuje vždy s jedním widgetem mapy. 

## Popisek (title)
<i>String</i><br>
Popisek, který se objeví v záhlaví widgetu.

## ID služby (serviceId)
<i>String</i><br>
ID mapové služby, jejíž vrstvy chceme přepínat. Jedná se o ID v rámci webové mapy. Toto ID lze zjistit např. v ArcGIS Online Assistant (sekce operationalLayers -> požadovaná vrstva -> parametr <b>id</b>). 

## Vyloučit podvrstvy (excludedSublayers)
<i>String[ ]</i><br>
ID vrstev v rámci definované mapové služby, které se nemají nabízet k přepínání. ID těchto vrstev odpovídá ID vrstev v mapové službě. V rámci grafické konfigurace widgetu se ID při zápisu oddělují čárkou, v rámci JSON konfigurace se jedná o pole stringů.   

## Příklad JSON konfigurace widgetu
```
{
  "title": "Zobrazit v mapě dle:",
  "serviceId": "Radary_view_28",
  "excludedSublayers": [ "5", "4", "7" ]
}
```
