all: PROD=--prod
all: dist

update:
	npm update

dist: update $(wildcard ./src/**)
	ng build $(PROD)

clean:
	$(RM) -r dist
