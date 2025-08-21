import React from "react";

export default function Footers() {
  return (
    <footer className="py-4">
      <div className="container py-4 text-center border-t">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} - جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
