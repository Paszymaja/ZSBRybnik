# Komponenty dostępne dla użytkowników

Osoby obsługujące wpisy oraz podstrony przez bazę danych mają do dyspozycji poniższe komponenty

## Elementy Markdown'a

### Zwykły tekst

Zapis zwykłego tekstu:

```txt
Integer porta elit eu mauris vehicula dignissim quis ac est. Proin scelerisque congue eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur congue nisi ut mattis mollis. Phasellus blandit, purus ac eleifend viverra, justo ipsum fringilla justo, suscipit sodales dui tortor nec arcu.

Morbi risus ante, eleifend sed auctor et, fringilla ut enim. Phasellus risus magna, commodo sit amet semper vitae, iaculis in erat. Vestibulum mollis elit ac lorem volutpat imperdiet.
```

Zapis tak jak powyższy zostanie przemianowany na stronie w:

```tsx
<TextBlock value="Integer porta elit eu mauris vehicula dignissim quis ac est. Proin scelerisque congue eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur congue nisi ut mattis mollis. Phasellus blandit, purus ac eleifend viverra, justo ipsum fringilla justo, suscipit sodales dui tortor nec arcu."/>
<TextBlock value="Morbi risus ante, eleifend sed auctor et, fringilla ut enim. Phasellus risus magna, commodo sit amet semper vitae, iaculis in erat. Vestibulum mollis elit ac lorem volutpat imperdiet."/>
```

Pusta linia oznacza wygenerowanie nowego akapitu. Napisanie tego tekstu ciągiem bez pustych liń spowoduje utworzenie się tylko jednego komponentu `TextBlock` na stronie.

## Elementy JSX

### Obrazek

Zapis obrazka:

```tsx
<Image src="Źródło" alt="Tekst alternatywny" text="Mały tekst pod obrazkiem"/>
```

Parametr `text` jest opcjonalny.

