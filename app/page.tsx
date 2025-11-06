"use client";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Button
        showAnchorIcon
        as={Link}
        color="primary"
        href="/login"
        variant="solid"
      >
        Login
      </Button>
    </div>
  );
};

export default Home;
