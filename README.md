# Dinner Planning App

This app is written in vanilla Javascript with Boostrap 5 and the Day.js library to make dates easier to work with. It was done as a learning project for vanilla Javascript. Please critique it.

It uses jsonstorage.net to store and retrieve json data for meals and leftovers. The API key here only accesses some throwaway data and will be revoked at some point. I've only included it so that a coulple of people can review my code.

# Plans

I'm probably just going to run this on my home server, so it won't be exposed to the Internet. I'm wondering if there's a simple way to store and retrieve json data from javascript on Linux. Or I might just use a bit of PHP to actually store and retrieve the data, I suppose. I'm open to any suggestions.

Another option (which I'm leaning towards) is SQLite.



# Documentation

I'm using jsonstorage.net (although I'm thinking of doing something differently in the future). This means that you'll have to set up a 'meals' and a 'leftovers' object there and input the IDs for your account, both items and your API key (needed for updating even public items).



The 'meals' item is an array of objects, so put in a sample object like this:

```json
[
    {
        "date": "MM/DD/YYYY",
        "text": "- Some food\n- Some more\n\t- some details"
    }
]
```

You need to use an escaped newline (i.e. '\n') for new lines and an escaped tab (i.e. '\t') after a newline for indented text.



The 'leftovers' item is just a simple object, so:

```json
{
    "leftovers": "- one thing\n- another thing"
}
```
