export default function Lighting() {
  return (
    <>
      <ambientLight intensity={4} />
      <pointLight position={[0, 0, 0]} intensity={2} color="yellow" castShadow />
    </>
  );
}