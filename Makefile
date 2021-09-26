publish:
		npm publish --dry-run
lint:
	npx eslint .
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
test-cov:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage