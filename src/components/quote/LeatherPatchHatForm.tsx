import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Upload, X, DollarSign } from "lucide-react";
import { submitQuoteRequest } from "@/lib/submitQuote";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Pricing (mirrors HatQuoteBuilder) ──────────────────
const HAT_PRICE_TIERS = [
  { min: 100, price: 19 },
  { min: 72, price: 21 },
  { min: 60, price: 22 },
  { min: 48, price: 23 },
  { min: 24, price: 26 },
  { min: 12, price: 27 },
];

const HAT_UPCHARGES: Record<string, number> = {
  "richardson-112": 0,
  "richardson-110": 1.25,
  "richardson-112pfp": 1.50,
  "yp-classics-6606": 1.05,
  "legacy-ofa": 2.00,
};

const EMBROIDERY_DIGITIZING_FEE = 45;
const MIN_QTY = 12;

function getPerHatPrice(qty: number): number | null {
  if (qty < MIN_QTY) return null;
  for (const tier of HAT_PRICE_TIERS) {
    if (qty >= tier.min) return tier.price;
  }
  return null;
}

function calcEstimate(hatModel: string, qty: number) {
  const base = getPerHatPrice(qty);
  if (!base) return null;
  const upcharge = HAT_UPCHARGES[hatModel] ?? 0;
  const perHat = base + upcharge;
  const subtotal = perHat * qty;
  return { perHat, base, upcharge, subtotal, qty };
}

// ── Options ────────────────────────────────────────────
const HAT_BRANDS = [
  { value: "richardson", label: "Richardson" },
  { value: "yp-classics", label: "YP Classics (Yupoong)" },
  { value: "legacy", label: "Legacy" },
  { value: "pacific-headwear", label: "Pacific Headwear" },
  { value: "outdoor-cap", label: "Outdoor Cap" },
  { value: "other", label: "Other / Not Sure" },
];

const HAT_MODELS = [
  { value: "richardson-112", label: "Richardson 112 (Trucker Snapback)", upcharge: "" },
  { value: "richardson-112pfp", label: "Richardson 112PFP (Five Panel)", upcharge: "+$1.50" },
  { value: "richardson-110", label: "Richardson 110 (R-Flex Fitted)", upcharge: "+$1.25" },
  { value: "richardson-115", label: "Richardson 115 (Low Pro Trucker)", upcharge: "" },
  { value: "yp-classics-6606", label: "YP Classics 6606 (Retro Trucker)", upcharge: "+$1.05" },
  { value: "legacy-ofa", label: "Legacy OFA (Unstructured)", upcharge: "+$2.00" },
  { value: "other", label: "Other / Not Sure", upcharge: "" },
];

// ── Model-specific colorways ──────────────────────────
type ColorOption = { value: string; label: string };

const COLORS_112: ColorOption[] = [
  // ── Split Colors ──
  { value: "caramel-black", label: "Caramel / Black" },
  { value: "chocolate-chip-birch", label: "Chocolate Chip / Birch" },
  { value: "navy-caramel", label: "Navy / Caramel" },
  { value: "navy-khaki", label: "Navy / Khaki" },
  { value: "biscuit-true-blue", label: "Biscuit / True Blue" },
  { value: "black-charcoal", label: "Black / Charcoal" },
  { value: "black-gold", label: "Black / Gold" },
  { value: "black-vegas-gold", label: "Black / Vegas Gold" },
  { value: "black-white", label: "Black / White" },
  { value: "black-yellow", label: "Black / Yellow" },
  { value: "brown-khaki", label: "Brown / Khaki" },
  { value: "cardinal-black", label: "Cardinal / Black" },
  { value: "cardinal-white", label: "Cardinal / White" },
  { value: "charcoal-black", label: "Charcoal / Black" },
  { value: "charcoal-col-blue", label: "Charcoal / Columbia Blue" },
  { value: "charcoal-kelly", label: "Charcoal / Kelly" },
  { value: "charcoal-navy", label: "Charcoal / Navy" },
  { value: "charcoal-neon-blue", label: "Charcoal / Neon Blue" },
  { value: "charcoal-neon-green", label: "Charcoal / Neon Green" },
  { value: "charcoal-neon-orange", label: "Charcoal / Neon Orange" },
  { value: "charcoal-neon-pink", label: "Charcoal / Neon Pink" },
  { value: "charcoal-neon-yellow", label: "Charcoal / Neon Yellow" },
  { value: "charcoal-orange", label: "Charcoal / Orange" },
  { value: "charcoal-red", label: "Charcoal / Red" },
  { value: "charcoal-royal", label: "Charcoal / Royal" },
  { value: "charcoal-white", label: "Charcoal / White" },
  { value: "col-blue-black", label: "Columbia Blue / Black" },
  { value: "col-blue-khaki", label: "Columbia Blue / Khaki" },
  { value: "col-blue-white", label: "Columbia Blue / White" },
  { value: "cyan-white", label: "Cyan / White" },
  { value: "dark-green-gold", label: "Dark Green / Gold" },
  { value: "dark-green-white", label: "Dark Green / White" },
  { value: "dark-green-yellow", label: "Dark Green / Yellow" },
  { value: "heather-grey-black", label: "Heather Grey / Black" },
  { value: "heather-grey-dark-green", label: "Heather Grey / Dark Green" },
  { value: "heather-grey-light-grey", label: "Heather Grey / Light Grey" },
  { value: "heather-grey-navy", label: "Heather Grey / Navy" },
  { value: "heather-grey-red", label: "Heather Grey / Red" },
  { value: "heather-grey-royal", label: "Heather Grey / Royal" },
  { value: "heather-grey-white", label: "Heather Grey / White" },
  { value: "hot-pink-black", label: "Hot Pink / Black" },
  { value: "hot-pink-white", label: "Hot Pink / White" },
  { value: "kelly-black", label: "Kelly / Black" },
  { value: "kelly-white", label: "Kelly / White" },
  { value: "khaki-burgundy", label: "Khaki / Burgundy" },
  { value: "khaki-coffee", label: "Khaki / Coffee" },
  { value: "khaki-white", label: "Khaki / White" },
  { value: "loden-black", label: "Loden / Black" },
  { value: "maroon-white", label: "Maroon / White" },
  { value: "navy-charcoal", label: "Navy / Charcoal" },
  { value: "navy-orange", label: "Navy / Orange" },
  { value: "navy-red", label: "Navy / Red" },
  { value: "navy-white", label: "Navy / White" },
  { value: "orange-black", label: "Orange / Black" },
  { value: "orange-white", label: "Orange / White" },
  { value: "purple-white", label: "Purple / White" },
  { value: "red-black", label: "Red / Black" },
  { value: "red-white", label: "Red / White" },
  { value: "royal-black", label: "Royal / Black" },
  { value: "royal-red", label: "Royal / Red" },
  { value: "royal-white", label: "Royal / White" },
  // ── Tri-Colors ──
  { value: "blue-teal-birch-navy", label: "Blue Teal / Birch / Navy" },
  { value: "hgrey-birch-amber-gold", label: "Heather Grey / Birch / Amber Gold" },
  { value: "hgrey-birch-army-olive", label: "Heather Grey / Birch / Army Olive" },
  { value: "hgrey-dkgreen-black", label: "Heather Grey / Dark Green / Black" },
  { value: "hgrey-red-black", label: "Heather Grey / Red / Black" },
  { value: "hgrey-royal-black", label: "Heather Grey / Royal / Black" },
  { value: "mink-beige-charcoal-amber", label: "Mink Beige / Charcoal / Amber Gold" },
  { value: "white-aluminum-black", label: "White / Aluminum / Black" },
  { value: "white-aluminum-navy", label: "White / Aluminum / Navy" },
  { value: "white-col-blue-yellow", label: "White / Columbia Blue / Yellow" },
  { value: "black-white-hgrey", label: "Black / White / Heather Grey" },
  { value: "black-white-red", label: "Black / White / Red" },
  { value: "col-blue-white-navy", label: "Columbia Blue / White / Navy" },
  { value: "dkgreen-white-hgrey", label: "Dark Green / White / Heather Grey" },
  { value: "grey-charcoal-black", label: "Grey / Charcoal / Black" },
  { value: "grey-charcoal-navy", label: "Grey / Charcoal / Navy" },
  { value: "hgrey-cardinal-navy", label: "Heather Grey / Cardinal / Navy" },
  { value: "hgrey-charcoal-dk-orange", label: "Heather Grey / Charcoal / Dark Orange" },
  { value: "hgrey-charcoal-maroon", label: "Heather Grey / Charcoal / Maroon" },
  { value: "navy-white-hgrey", label: "Navy / White / Heather Grey" },
  { value: "navy-white-red", label: "Navy / White / Red" },
  { value: "orange-white-black", label: "Orange / White / Black" },
  { value: "red-white-black", label: "Red / White / Black" },
  { value: "red-white-hgrey", label: "Red / White / Heather Grey" },
  { value: "red-white-navy", label: "Red / White / Navy" },
  { value: "royal-white-hgrey", label: "Royal / White / Heather Grey" },
  { value: "royal-white-red", label: "Royal / White / Red" },
  // ── Alternate Colors ──
  { value: "white-black", label: "White / Black" },
  { value: "white-dark-green", label: "White / Dark Green" },
  { value: "white-maroon", label: "White / Maroon" },
  { value: "white-navy", label: "White / Navy" },
  { value: "white-red", label: "White / Red" },
  { value: "white-royal", label: "White / Royal" },
  // ── Solid Colors ──
  { value: "solid-quarry", label: "Quarry (Solid)" },
  { value: "solid-black", label: "Black (Solid)" },
  { value: "solid-cardinal", label: "Cardinal (Solid)" },
  { value: "solid-col-blue", label: "Columbia Blue (Solid)" },
  { value: "solid-dark-green", label: "Dark Green (Solid)" },
  { value: "solid-loden", label: "Loden (Solid)" },
  { value: "solid-navy", label: "Navy (Solid)" },
  { value: "solid-orange", label: "Orange (Solid)" },
  { value: "solid-purple", label: "Purple (Solid)" },
  { value: "solid-red", label: "Red (Solid)" },
  { value: "solid-royal", label: "Royal (Solid)" },
  { value: "solid-white", label: "White (Solid)" },
  // ── Camo ──
  { value: "realtree-edge-black", label: "Realtree Edge Camo / Black" },
  { value: "realtree-edge-white", label: "Realtree Edge Camo / White" },
  { value: "mossy-oak-black", label: "Mossy Oak / Black" },
  { value: "multicam-black", label: "MultiCam / Black" },
  { value: "other", label: "Other — specify in notes" },
];

const COLORS_112PFP: ColorOption[] = [
  // ── Duck Camo ──
  { value: "admiral-duck-camo-black", label: "Admiral Duck Camo / Black" },
  { value: "americana-duck-camo-white", label: "Americana Duck Camo / White" },
  { value: "bark-duck-camo-brown", label: "Bark Duck Camo / Brown" },
  { value: "blaze-duck-camo-blaze", label: "Blaze Duck Camo / Blaze" },
  { value: "blizzard-duck-camo-white", label: "Blizzard Duck Camo / White" },
  { value: "harvest-duck-camo-light-tan", label: "Harvest Duck Camo / Light Tan" },
  { value: "marsh-duck-camo-loden", label: "Marsh Duck Camo / Loden" },
  { value: "sable-duck-camo-black", label: "Sable Duck Camo / Black" },
  { value: "saltwater-duck-camo-charcoal", label: "Saltwater Duck Camo / Charcoal" },
  { value: "sienna-duck-camo-loden", label: "Sienna Duck Camo / Loden" },
  // ── Realtree / Mossy Oak / Kryptek ──
  { value: "realtree-edge-brown", label: "Realtree Edge / Brown" },
  { value: "realtree-edge-neon-orange", label: "Realtree Edge / Neon Orange" },
  { value: "realtree-edge-neon-pink", label: "Realtree Edge / Neon Pink" },
  { value: "realtree-excape-black", label: "Realtree Excape / Black" },
  { value: "realtree-fishing", label: "Realtree Fishing" },
  { value: "realtree-original-black", label: "Realtree Original / Black" },
  { value: "realtree-max-1", label: "Realtree Max 1" },
  { value: "realtree-max-7", label: "Realtree Max 7" },
  { value: "realtree-timber-black", label: "Realtree Timber / Black" },
  { value: "mossy-oak-bottomland-loden", label: "Mossy Oak Bottomland / Loden" },
  { value: "mossy-oak-country-dna-black", label: "Mossy Oak Country DNA / Black" },
  { value: "mossy-oak-bonefish-light-grey", label: "Mossy Oak Elements Bonefish / Light Grey" },
  { value: "kryptek-highlander-buck", label: "Kryptek Highlander / Buck" },
  { value: "kryptek-inferno-blaze", label: "Kryptek Inferno / Blaze Orange" },
  { value: "kryptek-pontus-white", label: "Kryptek Pontus / White" },
  { value: "kryptek-typhon-blaze", label: "Kryptek Typhon / Blaze Orange" },
  // ── Other Prints ──
  { value: "black-tonal-stars-stripes", label: "Black / Tonal Stars and Stripes" },
  { value: "loden-tonal-stars-stripes", label: "Loden / Tonal Stars and Stripes" },
  { value: "desert-camo-brown", label: "Desert Camo / Brown" },
  { value: "digital-camo-light-green", label: "Digital Camo / Light Green" },
  { value: "green-camo-black", label: "Green Camo / Black" },
  { value: "green-camo-white", label: "Green Camo / White" },
  { value: "typhon-black", label: "Typhon / Black" },
  { value: "other", label: "Other — specify in notes" },
];

const COLORS_110: ColorOption[] = [
  // ── Solid ──
  { value: "solid-black", label: "Black (Solid)" },
  { value: "solid-navy", label: "Navy (Solid)" },
  { value: "solid-white", label: "White (Solid)" },
  // ── Split ──
  { value: "black-white", label: "Black / White" },
  { value: "charcoal-black", label: "Charcoal / Black" },
  { value: "charcoal-neon-blue", label: "Charcoal / Neon Blue" },
  { value: "charcoal-neon-green", label: "Charcoal / Neon Green" },
  { value: "charcoal-neon-orange", label: "Charcoal / Neon Orange" },
  { value: "charcoal-neon-yellow", label: "Charcoal / Neon Yellow" },
  { value: "dark-green-white", label: "Dark Green / White" },
  { value: "dark-orange-khaki", label: "Dark Orange / Khaki" },
  { value: "green-camo-black", label: "Green Camo / Black" },
  { value: "heather-grey-black", label: "Heather Grey / Black" },
  { value: "heather-grey-dark-green", label: "Heather Grey / Dark Green" },
  { value: "heather-grey-navy", label: "Heather Grey / Navy" },
  { value: "heather-grey-royal", label: "Heather Grey / Royal" },
  { value: "heather-grey-white", label: "Heather Grey / White" },
  { value: "khaki-coffee", label: "Khaki / Coffee" },
  { value: "loden-black", label: "Loden / Black" },
  { value: "navy-white", label: "Navy / White" },
  { value: "royal-white", label: "Royal / White" },
  { value: "other", label: "Other — specify in notes" },
];

const COLORS_115: ColorOption[] = [
  // ── Solid ──
  { value: "solid-black", label: "Black (Solid)" },
  { value: "solid-loden", label: "Loden (Solid)" },
  { value: "solid-navy", label: "Navy (Solid)" },
  { value: "solid-white", label: "White (Solid)" },
  // ── Split ──
  { value: "aruba-blue-birch", label: "Aruba Blue / Birch" },
  { value: "black-charcoal", label: "Black / Charcoal" },
  { value: "black-neon-pink", label: "Black / Neon Pink" },
  { value: "black-white", label: "Black / White" },
  { value: "brown-dk-khaki", label: "Brown / Dk Khaki" },
  { value: "caramel-birch", label: "Caramel / Birch" },
  { value: "caramel-black", label: "Caramel / Black" },
  { value: "charcoal-black", label: "Charcoal / Black" },
  { value: "charcoal-red", label: "Charcoal / Red" },
  { value: "charcoal-white", label: "Charcoal / White" },
  { value: "chocolate-chip-birch", label: "Chocolate Chip / Birch" },
  { value: "chocolate-chip-grey-brown", label: "Chocolate Chip / Grey Brown" },
  { value: "coffee-claret", label: "Coffee / Claret" },
  { value: "cyan-black", label: "Cyan / Black" },
  { value: "dark-loden-jaffa-orange", label: "Dark Loden / Jaffa Orange" },
  { value: "dk-green-heather-light-grey", label: "Dk Green Heather / Light Grey" },
  { value: "heather-grey-dark-charcoal", label: "Heather Grey / Dark Charcoal" },
  { value: "hot-pink-black", label: "Hot Pink / Black" },
  { value: "lilac-birch", label: "Lilac / Birch" },
  { value: "loden-black", label: "Loden / Black" },
  { value: "navy-dk-khaki", label: "Navy / Dk Khaki" },
  { value: "navy-heather-light-grey", label: "Navy Heather / Light Grey" },
  { value: "navy-white", label: "Navy / White" },
  { value: "patina-green-birch", label: "Patina Green / Birch" },
  { value: "peach-birch", label: "Peach / Birch" },
  { value: "red-heather-light-grey", label: "Red Heather / Light Grey" },
  { value: "red-white", label: "Red / White" },
  { value: "royal-heather-light-grey", label: "Royal Heather / Light Grey" },
  { value: "royal-white", label: "Royal / White" },
  { value: "smoke-blue-aluminum", label: "Smoke Blue / Aluminum" },
  // ── Tri-Color ──
  { value: "blue-teal-birch-navy", label: "Blue Teal / Birch / Navy" },
  { value: "cream-loden-dark-orange", label: "Cream / Loden / Dark Orange" },
  { value: "dark-orange-birch-patriot-blue", label: "Dark Orange / Birch / Patriot Blue" },
  { value: "hgrey-birch-amber-gold", label: "Heather Grey / Birch / Amber Gold" },
  { value: "hgrey-birch-army-olive", label: "Heather Grey / Birch / Army Olive" },
  { value: "hgrey-birch-cardinal", label: "Heather Grey / Birch / Cardinal" },
  { value: "spruce-birch-light-navy", label: "Spruce / Birch / Light Navy" },
  { value: "tan-loden-brown", label: "Tan / Loden / Brown" },
  { value: "white-col-blue-brown", label: "White / Columbia Blue / Brown" },
  { value: "white-hawaiian-blue-pale-orange", label: "White / Hawaiian Blue / Pale Orange" },
  { value: "other", label: "Other — specify in notes" },
];

const COLORS_6606: ColorOption[] = [
  // ── Solid ──
  { value: "solid-black", label: "Black (Solid)" },
  { value: "solid-caramel", label: "Caramel (Solid)" },
  { value: "solid-charcoal", label: "Charcoal (Solid)" },
  { value: "solid-cranberry", label: "Cranberry (Solid)" },
  { value: "solid-dark-heather", label: "Dark Heather (Solid)" },
  { value: "solid-evergreen", label: "Evergreen (Solid)" },
  { value: "solid-khaki", label: "Khaki (Solid)" },
  { value: "solid-navy", label: "Navy (Solid)" },
  { value: "solid-pink", label: "Pink (Solid)" },
  { value: "solid-red", label: "Red (Solid)" },
  { value: "solid-silver", label: "Silver (Solid)" },
  { value: "solid-white", label: "White (Solid)" },
  // ── Two-Tone (6606T) ──
  { value: "black-loden", label: "Black / Loden" },
  { value: "brown-khaki", label: "Brown / Khaki" },
  { value: "buck-white", label: "Buck / White" },
  { value: "caramel-black", label: "Caramel / Black" },
  { value: "charcoal-navy", label: "Charcoal / Navy" },
  { value: "charcoal-neon-green", label: "Charcoal / Neon Green" },
  { value: "coyote-brown-black", label: "Coyote Brown / Black" },
  { value: "evergreen-white", label: "Evergreen / White" },
  { value: "heather-black", label: "Heather / Black" },
  { value: "maroon-grey", label: "Maroon / Grey" },
  { value: "navy-silver", label: "Navy / Silver" },
  { value: "steel-blue-silver", label: "Steel Blue / Silver" },
  { value: "turquoise-white", label: "Turquoise / White" },
  { value: "other", label: "Other — specify in notes" },
];

const HAT_COLORS_BY_MODEL: Record<string, ColorOption[]> = {
  "richardson-112": COLORS_112,
  "richardson-112pfp": COLORS_112PFP,
  "richardson-110": COLORS_110,
  "richardson-115": COLORS_115,
  "yp-classics-6606": COLORS_6606,
};

// Fallback for legacy/other/unknown models
const DEFAULT_COLORS: ColorOption[] = [
  ...COLORS_112.filter((c) => c.value !== "other"),
  { value: "other", label: "Other — specify in notes" },
];

const PATCH_SHAPES = [
  { value: "rectangle", label: "Rectangle" },
  { value: "rounded-rectangle", label: "Rounded Rectangle" },
  { value: "circle", label: "Circle" },
  { value: "oval", label: "Oval" },
  { value: "diamond", label: "Diamond" },
  { value: "custom", label: "Custom Die-Cut Shape" },
  { value: "other", label: "Other / Not Sure" },
];

const PATCH_SIZES = [
  { value: "2x3", label: '2" × 3"' },
  { value: "2.5x3.5", label: '2.5" × 3.5"' },
  { value: "3x3", label: '3" × 3"' },
  { value: "3x4", label: '3" × 4"' },
  { value: "custom", label: "Custom Size" },
];

const LEATHER_COLORS = [
  { value: "natural", label: "Natural (Tan)" },
  { value: "dark-brown", label: "Dark Brown" },
  { value: "black", label: "Black" },
  { value: "gray", label: "Gray" },
  { value: "other", label: "Other" },
];

const LeatherPatchHatForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [hatBrand, setHatBrand] = useState("");
  const [hatModel, setHatModel] = useState("");
  const [hatColor, setHatColor] = useState("");
  const [patchShape, setPatchShape] = useState("");
  const [patchSize, setPatchSize] = useState("");
  const [leatherColor, setLeatherColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const qty = Number(quantity) || 0;
  const estimate = useMemo(() => calcEstimate(hatModel, qty), [hatModel, qty]);

  const isValid =
    !!patchShape && qty >= MIN_QTY && !!name && !!email && !!phone;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    try {
      await submitQuoteRequest({
        serviceType: "leather_patch_hats",
        name,
        email,
        phone,
        company,
        notes,
        quantity,
        estimate: estimate ? { low: estimate.subtotal, high: estimate.subtotal } : null,
        details: {
          hatBrand,
          hatModel,
          hatColor,
          patchShape,
          patchSize,
          leatherColor,
        },
      });
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description:
          "We'll review your leather patch hat request and get back to you within one business day.",
      });
    } catch (err) {
      console.error("Quote submission error:", err);
      toast({
        title: "Something went wrong",
        description: "Please email us at info@hellscanyondesigns.com",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-primary/30 bg-primary/5 p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <Check className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">
          QUOTE REQUEST RECEIVED!
        </h3>
        <p className="mt-3 text-muted-foreground">
          Thanks, {name}! We'll review your leather patch hat request and send
          you a detailed quote within one business day.
        </p>
        <Button
          className="mt-8"
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setHatBrand("");
            setHatModel("");
            setHatColor("");
            setPatchShape("");
            setPatchSize("");
            setLeatherColor("");
            setQuantity("");
            setArtworkFile(null);
            setNotes("");
            setName("");
            setEmail("");
            setPhone("");
            setCompany("");
          }}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
      {/* Hat Details */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          HAT DETAILS
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="text-foreground">Hat Brand</Label>
            <Select value={hatBrand} onValueChange={setHatBrand}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select brand..." />
              </SelectTrigger>
              <SelectContent>
                {HAT_BRANDS.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-foreground">Hat Model</Label>
            <Select value={hatModel} onValueChange={setHatModel}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select model..." />
              </SelectTrigger>
              <SelectContent>
                {HAT_MODELS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}{m.upcharge ? ` (${m.upcharge}/hat)` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label className="text-foreground">Hat Color</Label>
            <Select value={hatColor} onValueChange={setHatColor}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select color..." />
              </SelectTrigger>
              <SelectContent>
                {HAT_COLORS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Patch Details */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          PATCH DETAILS
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <Label className="text-foreground">Patch Shape *</Label>
            <Select value={patchShape} onValueChange={setPatchShape}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select shape..." />
              </SelectTrigger>
              <SelectContent>
                {PATCH_SHAPES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-foreground">Patch Size</Label>
            <Select value={patchSize} onValueChange={setPatchSize}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select size..." />
              </SelectTrigger>
              <SelectContent>
                {PATCH_SIZES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-foreground">Leather Color</Label>
            <Select value={leatherColor} onValueChange={setLeatherColor}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select color..." />
              </SelectTrigger>
              <SelectContent>
                {LEATHER_COLORS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Quantity + Live Pricing */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          QUANTITY & PRICING
        </h3>
        <div className="mt-4">
          <Label htmlFor="qty" className="text-foreground">
            How many hats? * (minimum {MIN_QTY})
          </Label>
          <Input
            id="qty"
            type="number"
            min={MIN_QTY}
            placeholder="e.g. 48"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1.5 max-w-[200px] text-lg"
          />
          {qty > 0 && qty < MIN_QTY && (
            <p className="mt-2 text-sm text-destructive">
              Minimum order is {MIN_QTY} hats.
            </p>
          )}
        </div>

        {/* Clickable pricing tiers */}
        <div className="mt-5 rounded-lg border border-border bg-secondary/30 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Volume Pricing — click a tier or enter a custom quantity
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {HAT_PRICE_TIERS.slice().reverse().map((tier) => {
              const isActive =
                qty >= tier.min &&
                HAT_PRICE_TIERS.find((t) => qty >= t.min)?.min === tier.min;
              return (
                <button
                  key={tier.min}
                  type="button"
                  onClick={() => setQuantity(String(tier.min))}
                  className={`rounded-md border px-3 py-2 text-center transition-colors cursor-pointer hover:border-primary/60 ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  <span className="block text-xs">{tier.min}+</span>
                  <span className="block text-sm font-bold">${tier.price}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Prices shown per hat on Richardson 112. Includes patch + hat + free shipping.
          </p>
        </div>

        {/* Live estimate */}
        {estimate && (
          <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <DollarSign className="h-4 w-4" />
              ESTIMATED PRICING
            </div>
            <div className="mt-3 flex items-baseline gap-1 text-2xl font-bold text-foreground">
              ${estimate.perHat.toFixed(2)}
              <span className="text-sm font-normal text-muted-foreground">/hat</span>
              {estimate.upcharge > 0 && (
                <span className="ml-2 text-xs text-muted-foreground">
                  (base ${estimate.base} + ${estimate.upcharge.toFixed(2)} hat upcharge)
                </span>
              )}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {estimate.qty} hats × ${estimate.perHat.toFixed(2)} ={" "}
              <span className="font-semibold text-foreground">
                ${estimate.subtotal.toFixed(2)}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Includes patch + hat + free shipping. Final price confirmed within 1 business day.
            </p>
          </div>
        )}
      </div>

      {/* Artwork */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          ARTWORK
        </h3>
        <div className="mt-4">
          {artworkFile ? (
            <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-3">
                <Upload className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {artworkFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(artworkFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setArtworkFile(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 p-8 transition-colors hover:border-primary/50 hover:bg-secondary/50">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="mt-3 text-sm font-medium text-foreground">
                Click to upload artwork
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                AI, EPS, SVG, PDF, PNG, or JPG (max 20MB)
              </span>
              <input
                type="file"
                className="hidden"
                accept=".ai,.eps,.svg,.pdf,.png,.jpg,.jpeg"
                onChange={(e) => setArtworkFile(e.target.files?.[0] || null)}
              />
            </label>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          NOTES
        </h3>
        <div className="mt-4">
          <Textarea
            placeholder="Special requests, multiple hat colors, size breakdowns, questions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          CONTACT INFO
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="name" className="text-foreground">
              Full Name *
            </Label>
            <Input
              id="name"
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-foreground">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-foreground">
              Phone *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(208) 555-1234"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="company" className="text-foreground">
              Company / Organization
            </Label>
            <Input
              id="company"
              placeholder="Your business name (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        disabled={!isValid || submitting}
        className="w-full font-heading text-base tracking-wide"
      >
        {submitting ? "Submitting..." : estimate
          ? `Submit Quote Request — Est. $${estimate.subtotal.toFixed(2)}`
          : "Submit Quote Request"}
      </Button>
    </form>
  );
};

export default LeatherPatchHatForm;
