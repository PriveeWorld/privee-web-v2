import { motion } from "framer-motion";

const ScrollButton = ({ direction, isDisabled, onClick }) => (
  <motion.button
    onClick={onClick}
    disabled={isDisabled}
    className={`p-3 rounded-full border-[1px] border-[#d4d4d4]/50 text-[#9c77d8] ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.1, backgroundColor: "#3A1772", color: "white" }}
    whileTap={{ scale: 0.95 }}
  >
    {direction === "up" ? "▲ Up" : "▼ Down"}
  </motion.button>
);

export default ScrollButton;
