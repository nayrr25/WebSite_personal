// Iconos por vertical. Las cadenas viven en i18n (`t.verticals`).
// El orden DEBE coincidir con el de los items de cada vertical.

import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Landmark,
  CreditCard,
  Shield,
  Users,
  Megaphone,
  MessageSquare,
  Database,
} from "lucide-react";

/** Vertical 01 — institucional y financiera. */
const institutional: LucideIcon[] = [AlertTriangle, Landmark, CreditCard, Shield];

/** Vertical 02 — comercial y de consumidor. */
const commercial: LucideIcon[] = [Users, Megaphone, MessageSquare, Database];

export const verticalIcons: LucideIcon[][] = [institutional, commercial];
