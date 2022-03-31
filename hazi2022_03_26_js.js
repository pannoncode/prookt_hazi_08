console.log("Házi ok");
/*
    1. Az órán készített multiselectet alakítsátok át single select működésüvé, tehát, hogy csak egy elemet
       (egy p-t) lehessen kiválasztani. Tehát, ha egy ki van választva és egy másikat ki akarok választani, 
       akkor az előzőről tünjön el a kiválasztás, és az új elemre kerüljön át.

        2. A HTML oldalon helyezzetek el egy beviteli mezőt, és egy Hozzáad gombot.
        - DOM metódusokat segítségűl hívva, hozzatok létre egy lista teget (UL vagy OL) 
        - Ezt a listát adjátok hozzá a "#content" divhez
        - A Hozzáad gomb onclick eseményére (amit már JS-ből kérek) 
            - Hozzatok létre egy LI teget
            - A LI innerHTML paraméterét tegyétek egyenlővé a beviteli mező értékével
            - majd adjátok hozzá a LI-t a létrehozott listához.

    3. Keszitsetek egy Hibauzenet osztalyt.
        - a constructor megkapja annak a html tegnek a css selectorát, amiben a hibaüzenet megjelenik,
          és megkapja a hibauzenetet.
        - rendelkezzen egy show függvénnyel, ami megjeleníti a hibauzenetet
        - rendelkezzen egy hide függvénnyel, ami eltünteti a hibaüzenetet
        - írjatok egy setter függvényt, ami beállíthatja menet közben is a hibaüzenetet.
​
    4. A hibaüzenet osztályt használva a 2. feladat "Hozzáad" funkcionalitásában kezeljétek le az alábbi kitéteket:
        - Hozzat létre egy Hibaüzenet példányt "A szövegnek legkevesebb 3 karakterből kell állnia!" szöveggel
            - és csak akkor legyen sikeres a bevitel, ha ez a feltétel teljesül, ellentkező esetben 
            jelenjen meg a fenti hibaüzenet.

        - Hozzatok létre egy Hibaüzenet példányt "A szöveg nem tartalmazhat speciális karaktereket"
            - és csak akkor legyen sikeres a bevitel, ha ez a feltétel is teljesül.
            - ha nem teljesül jelenjen meg a hibaüzenet.
        - Ha minden feltétel teljesült, akkor a hibaüzenet törlődjön (azaz ne lássuk a képernyőn), és töröljük a
          beviteli mező értékét, hisz ebben a fázisban az abban írt szöveg már a lista részét kell képezze,
          vagyis a felhasználó számára azt az illuziót kell keltsük, hogy a mezőből a szöveg bekerült a listába!

    Jó munkát!
*/

/*
    1. Az órán készített multiselectet alakítsátok át single select működésüvé, tehát, hogy csak egy elemet
       (egy p-t) lehessen kiválasztani. Tehát, ha egy ki van választva és egy másikat ki akarok választani, 
       akkor az előzőről tünjön el a kiválasztás, és az új elemre kerüljön át.
*/
let content = document.querySelector("#content");


content.querySelectorAll("p").forEach(p => {
    p.onmouseover = function() {
        this.classList.add("highlight");
    };

    p.onmouseleave = function() {
        this.classList.remove("highlight")
    };
});




/*  2. A HTML oldalon helyezzetek el egy beviteli mezőt, és egy Hozzáad gombot.
        - DOM metódusokat segítségűl hívva, hozzatok létre egy lista teget (UL vagy OL) 
        - Ezt a listát adjátok hozzá a "#content" divhez
        - A Hozzáad gomb onclick eseményére (amit már JS-ből kérek) 
            - Hozzatok létre egy LI teget
            - A LI innerHTML paraméterét tegyétek egyenlővé a beviteli mező értékével
            - majd adjátok hozzá a LI-t a létrehozott listához.

   3. Keszitsetek egy Hibauzenet osztalyt.
        - a constructor megkapja annak a html tegnek a css selectorát, amiben a hibaüzenet megjelenik,
          és megkapja a hibauzenetet.
        - rendelkezzen egy show függvénnyel, ami megjeleníti a hibauzenetet
        - rendelkezzen egy hide függvénnyel, ami eltünteti a hibaüzenetet
        - írjatok egy setter függvényt, ami beállíthatja menet közben is a hibaüzenetet.

  4. A hibaüzenet osztályt használva a 2. feladat "Hozzáad" funkcionalitásában kezeljétek le az alábbi kitéteket:
        - Hozzat létre egy Hibaüzenet példányt "A szövegnek legkevesebb 3 karakterből kell állnia!" szöveggel
            - és csak akkor legyen sikeres a bevitel, ha ez a feltétel teljesül, ellentkező esetben 
            jelenjen meg a fenti hibaüzenet.

        - Hozzatok létre egy Hibaüzenet példányt "A szöveg nem tartalmazhat speciális karaktereket"
            - és csak akkor legyen sikeres a bevitel, ha ez a feltétel is teljesül.
            - ha nem teljesül jelenjen meg a hibaüzenet.
        - Ha minden feltétel teljesült, akkor a hibaüzenet törlődjön (azaz ne lássuk a képernyőn), és töröljük a
          beviteli mező értékét, hisz ebben a fázisban az abban írt szöveg már a lista részét kell képezze,
          vagyis a felhasználó számára azt az illuziót kell keltsük, hogy a mezőből a szöveg bekerült a listába!

 */


class ErrorMessage {

    constructor(htmlTagCss, errmess) {

        this.htmlTagCss = htmlTagCss;
        this.errormess = errmess;

        this.divTag = document.createElement("div");
    }

    show() {
        this.setter();
        content.appendChild(this.divTag);

    }

    hide() {
        for (let i = 0; i < content.childElementCount; i++) {
            if (content.lastElementChild.classList[0] === "error") {
                content.removeChild(content.lastElementChild);
            }
        }

    }

    setter() {
        this.divTag.innerHTML = this.errormess;
        this.divTag.classList.add(this.htmlTagCss);
        return this.divTag;
    }
}

let inp = document.querySelector("#lista");
let btn = document.querySelector("#add");

let listTag = document.createElement("ul");

content.appendChild(listTag);

btn.onclick = function() {

    let error1 = "A szövegnek legkevesebb 3 karakterből kell állnia!";
    let error2 = "A szöveg nem tartalmazhat speciális karaktereket";

    let errorsMess1 = new ErrorMessage("error", error1);
    let errorsMess2 = new ErrorMessage("error", error2);

    let regex = /[ `!@#$%¤^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;


    if (inp.value.length < 3) {
        errorsMess1.show();
    } else if (inp.value.search(regex) !== -1) {
        errorsMess2.show();
    } else {
        let liTag = document.createElement("li");
        liTag.innerHTML = inp.value;
        listTag.appendChild(liTag);
        inp.value = "";
        errorsMess1.hide();
    }
};