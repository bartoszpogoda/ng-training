# Z notatek
## Testy
Ilość testów powinna być zgodna z piramidą (na dole testy jednostkowe, na górze E2E).

Testów E2E nie pisze się w podstawowej fazie projektu, tylko już jak ma się dość kompletny produkt.

Angularowych testów E2E nie używa się, a raczej zewnętrzne frameworki, narzędzia - czyt. selenium. Z tego powodu, że testy E2E często powinny sprawdzać również backend.

W Angularze testy komponentów dzieli się na:

- (class) - jednostkowe testy klasy komponentu, nie wymagające infrastruktury angulara.

- (DOM) - testy zmian w DOMie, infrastruktura angulara udostępniona w klasie TestBed

Testy z code coverage uruchamia się poleceniem:

``` 
ng test --code-coverage
```

Testy asynchroniczne należy otoczyć zoną. Poprzez opakowanie definicji testu w wywolanie funkcji async().

## Wzorce architektoniczne

### MVC

Controller zna Model i View
View zna Model

W czystej formie "nie występuje w przyrodzie"

### MVVM (Model View ViewModel)

Podstawowy wzorzec implementowany w Angularze. View to HTML, ViewModel to kontrolery, Model to anemiczny (bez żadych zachowań - sam stan - DTO) model przychodzacy z serwera.

Flow: Serwer -> Model -> ViewModel -> Operacje na froncie -> ViewModel -> Model -> Serwer

### Flux/Redux

Store (flux może być kilka, redux - jeden). Akcje, reducery itp itd.

## Wzorce projektowe

### Smart & Dumb components
Podział na smart componenty (containers) oraz dumb componenty (presentational components). Smart componenty posiadają logikę pozyskiwania, zapisywania danych itp. Dumb componenty są "sterowane" przez smart componenty, dane dostają na inputach, zwracają na outputach. W założeniu małe, szybkie, reużywalne i proste do testowania.

### Kontrakty Front - Backend 

Kontrakt między frontem a backendem jest wyrażany w formie interfejsów TypeScript. Klasy nie są tutaj potrzebne, ponieważ model nie posiada żadnych zachowań - jest to sam kontrakt.

### Konwencja forRoot

Importowanie modułow metodą forRoot pozwala na zaimportowanie go wraz z providerami, czyli np serwisami. Implementuje się to jako metodę statyczną w module zwracającą obiekt typu ModuleWithProviders. Domyslnie importowane sa tylko komponenty, pipe i dyrektywy

```
export class BookModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: BookModule,
			providers: [BookService]
		}
	}
}

```


### Forms

Definicja interfejsu modelu forma. Przekształcenie wstepne na BookFormModel a nastepnie patchValue - ustawienie danych w formularzu.

```
interface BookFormModel {

}
```

Aby button submit był aktywny, ale w przypadku wcisniecia zeby pokazywaly sie bledy walidacji - dobra praktyka. Lepsze niż deaktywowanie buttonu submit.

```
#bookFormDirective="ngForm" [class.ng-submitted]="bookFormDirective.submitted">
```






### Struktura katalogów / modułów

Podział na:

FeatureModules, które logicznie odpowiadają podziału domenowemu aplikacji.

SharedModule - moduł na komponenty, exporty itp, wspóldzielone w obrębie całej aplikacji.

Dalszy podział na katalogi wygląda następująco w przypadku Feature module:

feature-a > components

feature-a > services

feature-a > model

czyli (feature > technical)

A w przypadku Shared module:

shared > auth > components
shared > auth > services
shared > layout > services

czyli (shared > topic > technical).

Zagnieżdzanie komponentów w innych komponentach jeśli dany komponent ma sens tylko w kontekście swojego komponentu rodzica.

### Inne

W template nie powinno być logiki. Powinna być wyciągana do controllerów - łatwiej je przetestować.

Eventy nazywać zgodnie z konwencją przyjętą w DOM, czyli "bookChange", a nie np. "bookChanged". Tak samo jak natywne 


## HTML

Dokument HTML to dokument i ma wyrażać kontent. Dlatego użycie tagów powinno być przemyślane i naturalne.

DOM jest to pamięciowa reprezentacja dokumentu HTML - drzewo obiektów w JavaScript. DOMContentLoaded to event, który rzuca przeglądarka po przetworzeniu HTMLa. 

Elementy DOM są opisywane przez atrybuty, propertisy i eventy.

Na elementach HTML które mają display: inline nie da się ustawiać marginesów, wielkości itp. Takie elementy wyświetlają się w linii - jak literki.

O marginesach, ogólnie o pozycjonowaniu elementu powinien decydować jego rodzic (kontener) a nie sam obiekt. Przykładowo komponent może definiować że ma się wyświetlać jako obiekt blokowy (display: block;), ale jego marginesy powinny już zostać ustalone na poziomie definicji stylów komponentu wyżej.

## JS

Falsy - false, 0, "", undefined, null, NaN

Truthy - not falsy

Porównuje się prawie zawzse za pomocą operatorów ===, !==. Wyjątkiem jest gdy chcemy sprawdzić czy obiekt nie jest nullem ani undefined - wtedy używamy !=.

## Routing

Router może reużywać komponenty jak ma możliwość - np jak zmieni się ID w rucie a komponenc zostaje ten sam. Wtedy powinno sie subksrybować na observable ActivatedRoute i być na to gotowym.

Jak jest przejscie z dialogu na ten sam dialog trzeba o to zadbać. I nie używać snapshota, a subskrybować się do Observable i reagować na takie zmiany.

Przekierowanie na stronę domowa robi się tak:
```
{   
    path: '',
    pathMatch: 'full',
    redirectTo: 'books'
}
```

### Resolver
Resolverów używa się gdy komponent potrzebuje danych zanim zostanie wyrenderowany. Specyficzny dla komponentu moze byc umieszczony w folderze komponentu - np BookDetailsResolver book-details.resolver.ts. Resolver jest wykonywany zawsze, nawet jak przechodzi sie z tego samego komponentu na ten sam (router może reużywać komponent). Router puszcza eventy jak jest ResolveStart i ResolveEnd - mozna sie zapiąc i np. pokazac spinnera.





## Różne

Moduły node (node modules) mają następujący system wersjonowania. Wersja składa się z trzech numerów - format X.Y.Z. W przypadku bugfixów podbija się tylko element Z. W przypadku podbicia Y wersja musi być kompatybilna wstecz - nic nie powinno się rozsypać. W przypadku X już nie musi być kompatybilna. W package.json da się sterować tym, na których pozycjach wersji zgadzamy się na zmiany i zaciąganie nowych paczek.


Polyfile są to pliki JS'owe, które służa do wyrównania platformy. Na przykład w przeglądarkach Internet Explorer aby dało się używać różnych funkcji i konstrukcji językowych.

Ceną decouplingu systemów jest między innymi utracenie trackingu - np. w przypadku event sourcingu (microservices).

W importach SCSS tylda oznacza katalog node_modules
```
@import "~bootstrap/scss/bootstrap"
```

W bootstrapie plik _reboot.scs restuje CSSy. Jest to coś co w przypadku tworzenia własnego stylowania należy zawzse zrobić - nadpisać różne rzeczy z przeglądarki.

W DevConsole Chrome po zaznaczeniu elementu jest on dostępny w konsoli pod zmienną $0.

Zone.js jest to biblioteka, która pozwala na "otoczenie kodu zoną", co z kolei pozwala na interceptowanie wszystkich wywołań asynchronicznych. Angular w ten sposób ogarnia między innymi change detection.

Requesty HTTP można cancelować (Fetch API).

Nie powinno się renderować np formularzy bez danych, w przypadku gdy mają tam być.

W TypeScripcie można łatwo tworzyć typy, które np bazują na innym typie ale bez jednego parametru. Przykład:

```
export interface Book {
    id: number;
    author: string;
    title: string;
};

export type BookProperties = Pick<Book, Exclude<keyof Book, 'id'>>;

```

Synonimy "słaby design" - "dyskusyjny design", "design z potencjałem do poprawy".

DI w Angularze działa na zasadzie drzewa, można provide'ować serwisy na poziomie modułow i komponentów. Angular szuka providera dla komponentu idąc w góre drzewa - bierze pierwszy.

W przypadku definicji dwóch implementacji serwisu, należy użyć mechanizmu InjectionToken.

Observable mogą działać synchronicznie oraz asynchronicznie.

Wystawienie book jako template variable:
```
<form (submit)="notifyOnBookUpdate($event)" 
*ngIf="book$ | async as book">
```

Walidatory formów moga być asynchroniczne (3 argment przy tworzeniu FormControl). Walidatory można również umieszczać na poziomie grup - co umożliwia m.in cross-walidację.

Daty powinny być przesyłane w formie stringa w formacie ISO. Na froncie dobrymi bibliotekami do konwersji dat są Moment.js (oraz Luxon).

Aby wspierać IE wystarczy usunąć "not" przed tą przeglądarką w pliku browserslist.

## Książki

"Clean Architecture" - Robert C. Martin

"JavaScript: The Good Parts" - Douglas Crockford

# MyDreamApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
