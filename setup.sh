# Создаем правильный package.json
cat > package.json << 'EOL'
{
  "name": "npmfr",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@craco/craco": "^7.0.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "lucide-react": "^0.263.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOL

# Создаем craco.config.js
cat > craco.config.js << 'EOL'
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
EOL

# Устанавливаем зависимости заново
rm -rf node_modules package-lock.json
npm install

# Создаем UI компоненты
mkdir -p src/components/ui

# Button компонент
cat > src/components/ui/button.jsx << 'EOL'
import React from 'react';

export const Button = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
EOL

# Checkbox компонент
cat > src/components/ui/checkbox.jsx << 'EOL'
import React from 'react';

export const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      className={`h-4 w-4 rounded border-gray-300 ${className}`}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";
EOL

# Alert компонент
cat > src/components/ui/alert.jsx << 'EOL'
import React from 'react';

export const Alert = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="alert"
      className={`rounded-lg border p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

export const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm ${className}`}
    {...props}
  />
));

Alert.displayName = "Alert";
AlertDescription.displayName = "AlertDescription";
EOL

echo "Базовая структура создана. Теперь выполните npm start"


