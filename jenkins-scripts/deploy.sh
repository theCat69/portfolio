rm -rf "$PORTFOLIO_PATH"/*
cp -r "$BUILD_PATH"/* "$PORTFOLIO_PATH"/
find "$PORTFOLIO_PATH" -type f -exec chmod 664 -- {} +
find "$PORTFOLIO_PATH" -type d -exec chmod 775 -- {} +
sudo chown -R staticweb:staticweb "$PORTFOLIO_PATH"
