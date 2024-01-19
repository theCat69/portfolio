rm -rf "$PORTFOLIO_PATH"/*
mkdir "$PORTFOLIO_PATH"/"$STATIC_FILE"
mkdir "$PORTFOLIO_PATH"/tls
cp "$BUILD_PATH"/"$BIN_NAME" "$PORTFOLIO_PATH"/
cp Rocket.toml "$PORTFOLIO_PATH"/
cp -r ./tls/* "$PORTFOLIO_PATH"/tls
cp -r "$BUILD_PATH"/"$STATIC_FILE"/* "$PORTFOLIO_PATH"/"$STATIC_FILE"
find "$PORTFOLIO_PATH" -type f -exec chmod 664 -- {} +
find "$PORTFOLIO_PATH" -type d -exec chmod 775 -- {} +
sudo chmod 774 "$PORTFOLIO_PATH"/"$BIN_NAME"
sudo chown -R portfolio:portfolio "$PORTFOLIO_PATH"
