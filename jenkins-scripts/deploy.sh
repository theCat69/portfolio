rm -rf "$PORTFOLIO_PATH"/*
cp -r "$BUILD_PATH"/* "$PORTFOLIO_PATH"/
find "$PORTFOLIO_PATH" -type f -exec chmod 664 -- {} +
find "$PORTFOLIO_PATH" -exec chown staticweb:staticweb -- {} +
